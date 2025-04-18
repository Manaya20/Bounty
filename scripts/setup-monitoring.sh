#!/bin/bash

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "kubectl not found. Please install it first."
    exit 1
fi

# Check if helm is installed
if ! command -v helm &> /dev/null; then
    echo "helm not found. Please install it first."
    exit 1
fi

# Add required Helm repositories
echo "Adding Helm repositories..."
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add elastic https://helm.elastic.co
helm repo update

# Create monitoring namespace
echo "Creating monitoring namespace..."
kubectl create namespace monitoring

# Install Prometheus
echo "Installing Prometheus..."
helm install prometheus prometheus-community/prometheus \
  --namespace monitoring \
  --set server.persistentVolume.storageClass="gp2" \
  --set server.retention="7d"

# Install Grafana
echo "Installing Grafana..."
helm install grafana grafana/grafana \
  --namespace monitoring \
  --set persistence.enabled=true \
  --set persistence.storageClassName="gp2" \
  --set adminPassword='admin' \
  --set datasources."datasources\.yaml".apiVersion=1 \
  --set datasources."datasources\.yaml".datasources[0].name=Prometheus \
  --set datasources."datasources\.yaml".datasources[0].type=prometheus \
  --set datasources."datasources\.yaml".datasources[0].url=http://prometheus-server.monitoring.svc.cluster.local \
  --set datasources."datasources\.yaml".datasources[0].access=proxy \
  --set datasources."datasources\.yaml".datasources[0].isDefault=true

# Install ELK Stack
echo "Installing Elasticsearch..."
helm install elasticsearch elastic/elasticsearch \
  --namespace monitoring \
  --set replicas=1 \
  --set minimumMasterNodes=1

echo "Installing Kibana..."
helm install kibana elastic/kibana \
  --namespace monitoring \
  --set service.type=LoadBalancer

echo "Installing Logstash..."
helm install logstash elastic/logstash \
  --namespace monitoring

# Wait for services to be ready
echo "Waiting for services to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=prometheus-server -n monitoring
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=grafana -n monitoring
kubectl wait --for=condition=ready pod -l app=elasticsearch-master -n monitoring

# Get Grafana admin password
echo "Grafana admin password: admin"
echo "You can change this password after first login"

# Get Kibana URL
KIBANA_URL=$(kubectl get svc kibana-kibana -n monitoring -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "Kibana URL: http://$KIBANA_URL:5601"

echo "Monitoring stack setup completed!" 