variable "gcp_project_id" {
  description = "Your Google Cloud Project ID"
  type        = string
}

variable "gcp_region" {
  description = "Google Cloud region for resources"
  type        = string
  default     = "us-central1"
}

variable "gke_cluster_name" {
  description = "Name for the GKE cluster"
  type        = string
  default     = "bounty-cluster"
}

variable "gke_node_count" {
  description = "Number of nodes per zone in the default GKE node pool"
  type        = number
  default     = 1
}

variable "gke_machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "e2-small"
}

variable "vpc_network_name" {
  description = "Name for the VPC network"
  type        = string
  default     = "bounty-vpc"
}

variable "artifact_registry_repo_name" {
  description = "Name for the Artifact Registry Docker repository"
  type        = string
  default     = "bounty-repo"
}