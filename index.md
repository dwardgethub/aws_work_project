# ☁️ AWS Cloud Architecture Portfolio
A collection of cloud labs and infrastructure designs I've implemented.

## 🛠️ Featured Lab: Cloud Infrastructure with Generative AI
### 📌 Overview
Speed up and automate the deployment & management of cloud infrastructure by using the AWS CDK and Amazon Q.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/CloudInfraGenAI.png)

### 🚀 Key Services Used
* **VPC**: Networking and security groups.
* **AWS CDK**: Cloud Development Kit
* **Amazon Q**: Generative AI assistant
* **CloudFormation**: Cloud formation service
* **IDE**: Integrated Development Env
* **NAT GW**: NAT Gateway
* **Internet GW**: Internet Gateway
* **ALB**: Application Load Balancers
* **Application Server**: Application server services
* **Application DB**: Relational Database
* **EC2**: Web servers.
* **S3**: Static asset hosting.

### 💡 Lessons Learned
* [Point 1: Create various AWS resources by using the AWS CDK and Amazon Q.]
* [Point 2: Deploy an application by using the AWS CDK and Amazon Q.]
* [Point 3: Test the application by using an ALB.]
* [Point 4: Update the CDK application code to create and deploy a new EC2 instance in different AZ.]
* [Point 5: Configure the new EC2 instance in the ALB & test application.]


## 🛠️ Featured Lab: Analyzing Network Traffic
### 📌 Overview
Detect and deny network traffic from a specific IP address to increase security

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/AnalyzingNtwkTraffic.png)

### 🚀 Key Services Used
* **Amazon VPC**: Networking and security groups.
* **EC2**: Web servers.
* **S3**: Static asset hosting.

### 💡 Lessons Learned
* [Point 1: How to setup and handle VPC Flow logs.]
* [Point 2: Troubleshooting security group rules.]
* [Point 3: Create Acess Control List (ACL) rules to block traffic.]
* [Point 4: Reject outbound traffic by using a ntwk ACL.]



## 🛠️ Featured Lab: Auto-Healing and Scaling Applications
### 📌 Overview
Configure scheduled scaling rules for an EC2 Auto Scaling group

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/AutoScalingHealing.png)

### 🚀 Key Services Used
* **CloudWatch**: Monitoring workload activities and events.
* **Auto Scaling group**: Provisioning auto-scaling groups of EC2s.
* **EC2**: Web servers.
* **AMI**: Provision Amazon Machine Image (AMI) instances on EC2s.
* **S3**: Static asset hosting.

### 💡 Lessons Learned
* [Point 1: Create an EC2 Auto Scaling group.]
* [Point 2: Assign EC2 instances to the Auto Scaling Group.]
* [Point 3: Scheduling ASG activities.]

## 🛠️ Featured Lab: Connecting VPCs
### 📌 Overview
Implement VPC peeering to enable communication between VPCs, allowing Marketing and Developer EC2 instances to access the Financial Services server in the Finance VPC.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ConnectingVPCs.png)

### 🚀 Key Services Used
* **Amazon VPC**: Networking and security groups.
* **EC2**: Web servers.
* **S3**: Static asset hosting.
* **VPC Peering**: VPC Peering connection

### 💡 Lessons Learned
* [Point 1: Setup a VPC peering connection.]
* [Point 2: Make sure that traffic is properly routed between the peered VPCs.]
* [Point 3: Configure VPC peering between Developer and Finance dept VPCs.]

## 🛠️ Featured Lab: Data Ingestion Methods
### 📌 Overview
Ingest, transform, and analyze real-time data by using Amazon Data Firehose, Lambda, Glue and Athena.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DataIngestionMethods.png)

### 🚀 Key Services Used
* **VPC**: Networking and security groups.
* **EC2**: Web servers.
* **S3**: Static asset hosting.
* **Data Firehose**: Amazon Data Firehose
* **Lambda**: Lambda function
* **Dynamo DB**: Dynamo Database Table
* **Glue**: AWS Glue
* **Athena**: Amazon Athena
* **Clickstream**: Clickstream Source

### 💡 Lessons Learned
* [Point 1: Create an Data Firehose stream.]
* [Point 2: Ingest and store clickstream data in an S3 bucket.]
* [Point 3: Transform ingested data by using Lambda functions.]
* [Point 4: Create real-time queries by using AWS Glue and Athena.]
* [Point 5: Edit the Firehose stream Lambda config to send real-time analytics to DynamoDB table.]
* [Point 6: Change the S3 buffer interval settings.]

## 🛠️ Featured Lab: Decoupling Applications
### 📌 Overview
Improve availability and fault tolerance by decoupling microservices with messages sent to SQS queues and an SNS topic.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DecouplingApps.png)

### 🚀 Key Services Used
* **EC2**: Web servers/Message producer/consumers
* **S3**: Static asset hosting
* **SNS**: Amazon SNS Topic
* **Lambda**: Lambda function
* **Firehose**: AWS Kenesis Data Firehose
* **Athena**: HTTP Server
* **SQS**: Amazon SQS queue

### 💡 Lessons Learned
* [Point 1: Create an Data Firehose stream.]
* [Point 2: Create an SNS topic and SQS queue.]
* [Point 3: Subscribe the SQS queue to the SNS topic.]
* [Point 4: Create an additional SQS queue and set it as the Dead-letter queue for the existing imageQueue.]

## 🛠️ Featured Lab: Deploying APIs Gradually
### 📌 Overview
Deploy a serverless API by using AWS SAM and the traffic shifting capabilities of AWS CodeDeploy, providing gradual rollout of new versions with automated rollback protection.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DeployingAPIsGradually.png)

### 🚀 Key Services Used
* **EC2**: Web servers/Message producer/consumers
* **Lambda**: Lambda functions
* **API GW**: Amazon API Gateway
* **Action Group**: Action Group
* **CodeDeploy**: AWS CodeDeploy
* **CloudFormation**: CloudFormation stack
* **IDE**: Integraed development env

### 💡 Lessons Learned
* [Point 1: Use the AWS SAM command line to create a new project and build and deploy APIs.]
* [Point 2: Configure a canary deplouyment for APIs.]
* [Point 3: Change the deployment preference to "Linear10PercentEvery1Minute" setting.]
* [Point 4: Deploy the project by using the new configuration.]

## 🛠️ Featured Lab: Highly Available Web Applications
### 📌 Overview
Deploy the web application across multiple AZs with an ALB and health checks to provide high availability.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/HighlyAvailableWebApp.png)

### 🚀 Key Services Used
* **EC2**: Web servers/Message producer/consumers
* **Route53**: Route53 DNS functions
* **CloudFront**: Amazon CloudFront
* **S3**: S3 Bucket
* **ELB**: Elastic Load Balancer
* **CloudWatch**: CloudWatch monitor
* **RDS**: Relational Databases
* **AZs**: Availability Zones
* **Auto Scaling Groups**: Auto Scaling Group 

### 💡 Lessons Learned
* [Point 1: Configure an Auto Scaling group to use an Application Load Balancer.]
* [Point 2: Configure load balancer health checks for the Auto Scaling group.]
* [Point 3: Add a 2nd AZ to the Auto Scaling group.]
* [Point 4: Configure the existing Auto Scaling group to include a new EC2 instance in a 3rd AZ.]


## 🛠️ Featured Lab: Introduction to Genertive AI
### 📌 Overview
Use a foundation model on Amazon SageMaker AI for a scalable and secure AI solution.  Integrate an application with the AI model through Amazon API GW & Lambda.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/Intro2GenerativeAI.png)

### 🚀 Key Services Used
* **EC2**: Web servers/Message producer/consumers
* **API GW**: Amazon API GW
* **CloudFront**: Amazon CloudFront
* **S3**: S3 Bucket
* **Lambda**: AWS Lambda
* **SageMaker Model**: Amazon SageMaker Model 
* **SageMaker Edpt**: Amazon SageMaker Endpoint
* **Notebook**: Amazon SageMaker Notebook

### 💡 Lessons Learned
* [Point 1: Use Amazon SageMaker AI to deploy a foundation model as a hosted inference.]
* [Point 2: Update AWS Lambda code to use SageMaker Inference.]
* [Point 3: Use a sample app to test the deployed model.]
* [Point 4: Deploy the "huggingface-llm-falcon-7b-bf16" model in the SageMaker endpoint.]
* [Point 5: Update the Lambda code to use a new SageMaker endpoint.]
* [Point 6: Use the sample app to test the new model.]

## 🛠️ Featured Lab: Parallel Data Processing
### 📌 Overview
Implement an architecture based on SNS that enables parallel processing of rideshare data across multiple Lambda functions, with filtered message routing and CloudWatch monitoring of processing performance.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ParallelDataProcessing.png)

### 🚀 Key Services Used
* **DynamoDB**: DynamoDB NoSQL Table
* **API GW**: Amazon API GW
* **SNS Topic**: SNS Topic
* **Lambda**: AWS Lambda
* **CloudWatch**: CloudWatch Logs

### 💡 Lessons Learned
* [Point 1: Create an Amazon SNS topic.]
* [Point 2: Subscribe AWS Lambda functions as consumers of the SNS topic.]
* [Point 3: Use CloudWatch Logs insights to search and aggregate logs.]
* [Point 4: Create a new Lambda function (promotion_service) by using the lambda_role_diy IAM role (given).]
* [Point 5: Configure this new Lambda function to subscribe to the SNS topic you created.]
* [Point 6: Configure a filter to this subscription with the following criteria: {"distance":[{"numeric":[">",10]}]}]

## 🛠️ Featured Lab: Resource Governance
### 📌 Overview
Use AWS Config rules to enforce standards and help provide architecture consistency.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ResourceGovernance.png)

### 🚀 Key Services Used
* **Config**: AWS Config
* **S3**: S3 Bucket
* **EC2**: EC2 Instances

### 💡 Lessons Learned
* [Point 1: Configure an AWS Config managedd rule for S3 KMS encryption.]
* [Point 2: Configure an AWS Config managed rule for tagged resources.]
* [Point 3: Add an additional rule to verify that your S3 buckets have versioning enabled (s3-bucket-versioning-enabled).]
* [Point 4: Enable versioning on the S3 bucket, config-bucket.]

## 🛠️ Featured Lab: Single-Page App
### 📌 Overview
Deploy a single-page app by using S3, API GW, and Lambda. Use CloudWatch to troubleshoot the deployment.

### 🗺️ Architecture Diagram
![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/Single-PageApp.png)

### 🚀 Key Services Used
* **API GW**: AWS API GW
* **S3**: S3 Bucket
* **Lambda**: Lambda functions
* **DynamoDB**: DynamoDB table (vehicles)
* **Single-page app**: Single-page Application in S3 bucket

### 💡 Lessons Learned
* [Point 1: Configure S3 to host a single-page app.]
* [Point 2: Locate the API GW invoke URL.]
* [Point 3: Troubleshoot a Lambda function by using CloudWatch Logs.]
* [Point 4: Ensure that the Details buttons in the Vehicles app return vehicle details.]

