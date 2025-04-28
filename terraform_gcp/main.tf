# VPC Network
resource "google_compute_network" "vpc_network" {
  name                    = var.vpc_network_name
  auto_create_subnetworks = false
  project                 = var.gcp_project_id
  delete_default_routes_on_create = false
}

# Subnetwork
resource "google_compute_subnetwork" "subnet" {
  name                     = "${var.vpc_network_name}-subnet"
  ip_cidr_range            = "10.10.0.0/20" # Adjust if needed
  region                   = var.gcp_region
  network                  = google_compute_network.vpc_network.id
  project                  = var.gcp_project_id
  private_ip_google_access = true
  secondary_ip_range {
    range_name    = "gke-pods-range"
    ip_cidr_range = "10.20.0.0/16"
  }
  secondary_ip_range {
    range_name    = "gke-services-range"
    ip_cidr_range = "10.30.0.0/20"
  }
}

# GKE Cluster
resource "google_container_cluster" "primary" {
  name     = var.gke_cluster_name
  location = var.gcp_region
  project  = var.gcp_project_id

  network    = google_compute_network.vpc_network.id
  subnetwork = google_compute_subnetwork.subnet.id
  networking_mode = "VPC_NATIVE"
  ip_allocation_policy {
    cluster_secondary_range_name  = google_compute_subnetwork.subnet.secondary_ip_range[0].range_name
    services_secondary_range_name = google_compute_subnetwork.subnet.secondary_ip_range[1].range_name
  }

  remove_default_node_pool = true
  initial_node_count       = 1

  workload_identity_config {
    workload_pool = "${var.gcp_project_id}.svc.id.goog"
  }

  enable_shielded_nodes = true

  logging_service    = "logging.googleapis.com/kubernetes"
  monitoring_service = "monitoring.googleapis.com/kubernetes"

  release_channel {
    channel = "REGULAR"
  }

  maintenance_policy {
    daily_maintenance_window {
      start_time = "03:00"
    }
  }

  addons_config {
    gcp_secrets_store_csi_driver_config {
      enabled = true
    }
  }

  deletion_protection = false # Set to true for production
}

# GKE Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = google_container_cluster.primary.location
  cluster    = google_container_cluster.primary.name
  project    = var.gcp_project_id
  node_count = var.gke_node_count

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = var.gke_machine_type
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    shielded_instance_config {
      enable_integrity_monitoring = true
      enable_secure_boot          = true
    }
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
}

# Artifact Registry Repository
resource "google_artifact_registry_repository" "docker_repo" {
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = var.artifact_registry_repo_name
  description   = "Docker repository for Bounty app"
  format        = "DOCKER"
}
