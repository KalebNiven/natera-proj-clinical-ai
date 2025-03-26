# AWS ECR and EKS Deployment Guide

This guide walks you through the steps of using AWS CLI, Docker, and Kubernetes (via `kubectl` or Helm) to build, push Docker images to Amazon ECR, and deploy applications to Amazon EKS.

## Prerequisites

1. **AWS CLI Installed:**
   - Install AWS CLI v2 if you haven't already:  
     [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

2. **Docker Installed:**
   - Install Docker to build and push Docker images:  
     [Install Docker](https://docs.docker.com/get-docker/)

3. **kubectl Installed:**
   - Install kubectl for Kubernetes interaction:  
     [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

4. **Helm Installed (Optional, for Helm Deployments):**
   - Install Helm to deploy apps using Helm charts:  
     [Install Helm](https://helm.sh/docs/intro/install/)

5. **AWS Account Configured:**
   - Ensure AWS CLI is configured with access to your AWS account:  
     Run `aws configure` to set up AWS credentials.

6. **EKS Cluster Setup:**
   - Set up an Amazon EKS cluster. You can follow this [guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) to create an EKS cluster if you haven't done so.

---

## Steps

### 1. Build and Push Docker Image to Amazon ECR

**Step 1: Authenticate Docker to ECR**

Use AWS CLI to authenticate Docker to your ECR registry:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com

```
Replace <region> with your AWS region and <aws_account_id> with your AWS account ID.

**Step 2: Build Docker Image**

Navigate to your project directory and build your Docker image:

```bash

docker build -t <repo_name>:<tag> .

```
Replace <repo_name> with the name of your ECR repository and <tag> with your image tag (e.g., latest).

**Step 3: Tag the Docker Image**

Tag your local Docker image with the ECR repository URI:

```bash

docker tag <repo_name>:<tag> <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<repo_name>:<tag>

```

**Step 4: Push the Docker Image to ECR**

Push the Docker image to ECR:

```bash

docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/<repo_name>:<tag>

```

### 2. Deploy to Amazon EKS Using Helm

**Step 1: Configure kubectl for EKS**

Configure kubectl to interact with your EKS cluster:

```bash

aws eks --region <region> update-kubeconfig --name <cluster_name>

```
Replace <region> with your AWS region and <cluster_name> with your EKS cluster name.

Step 2: Install Helm

If you haven't installed Helm, use the installation guide above. After installing, verify Helm is working:

```bash

helm version

```
**Step 3: Deploy Using Helm Chart**

To deploy an app using a Helm chart:

```bash

helm install <release_name> <chart_name> --namespace <namespace>

```
If you don’t have a chart, you can install a public chart (e.g., NGINX):

```bash

helm install nginx-ingress ingress-nginx/ingress-nginx --namespace kube-system

```
**Step 4: Update a Helm Release**

To update an existing deployment with Helm:

```bash

helm upgrade <release_name> <chart_name> --namespace <namespace>

```
### 3. Deploy to Amazon EKS Using a YAML File

**Step 1: Apply the YAML File**

You can use a YAML file to deploy your app to EKS:

```bash

kubectl apply -f <your_yaml_file>.yaml

```
Ensure your YAML file contains proper Kubernetes configurations for deployments, services, etc.

**Step 2: Verify the Deployment**

To verify that your pod is running:

```bash

kubectl get pods --namespace <namespace>
```
For deployments:

```bash

kubectl get deployments --namespace <namespace>

```
