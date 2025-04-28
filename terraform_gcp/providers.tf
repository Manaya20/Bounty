terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.20"
    }
  }
  # backend "gcs" { # <<<--- UNCOMMENT AND CONFIGURE FOR REMOTE STATE
  #   bucket  = "your-unique-tfstate-bucket-name"
  #   prefix  = "terraform/state/bounty-app"
  # }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}