# ☁️ AWS Cloud Architecture Portfolio

This portfolio showcases hands-on AWS architecture across serverless computing, real-time application design, generative AI integration, data engineering, and network infrastructure. Each lab reflects production-relevant patterns — not just console exercises — with architecture diagrams, service rationale, and key technical takeaways.

---

## 🌟 Flagship Project: Tic Tac Toe with Claude AI Integration

### 📌 Overview

An AI-enhanced, real-time multiplayer Tic Tac Toe game that extends a fully serverless AWS backend with a live Claude AI opponent — demonstrating how generative AI can be integrated into production cloud architectures as a first-class, event-driven service. Players choose between human-vs-human multiplayer (via WebSocket) or human-vs-AI mode, where an AWS Lambda function invokes the Anthropic Claude API in real time to generate intelligent game moves.

This project showcases the full intersection of modern cloud-native architecture and applied generative AI — a pattern directly applicable to AI-assisted enterprise applications, intelligent automation, and real-time decision support systems.

### 🗺️ Architecture Diagram

![AWS + Claude AI Architecture](https://github.com/dwardgethub/aws_work_project/raw/main/tictactoe/archive/tttArch_Claude.png)

> *Left: existing serverless stack (CloudFront, S3, API Gateway, Lambda, DynamoDB). Right: new AI layer (ttt-aiMove Lambda → Claude API). Dashed line indicates AI mode invocation path.*

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **CloudFront** | Global CDN delivery of the frontend with low-latency edge caching |
| **S3** | Static frontend hosting (HTML + game mode selector) with OAC security |
| **API Gateway** | WebSocket API managing persistent, bidirectional player connections |
| **Lambda (5 functions)** | Route handlers for game logic, player events, and AI move orchestration |
| **DynamoDB** | Real-time game state and active connection persistence |
| **ttt-aiMove Lambda** | Dedicated AI invocation function — isolates Claude API calls from core game logic |
| **Claude API (Anthropic)** | Generative AI engine providing intelligent, context-aware game moves |
| **IAM** | Least-privilege execution roles scoped per Lambda function |
| **CloudWatch** | End-to-end observability across all Lambda functions and AI invocations |

### 🏗️ Architectural Design Decisions

**Why a dedicated `ttt-aiMove` Lambda?**
Isolating the Claude API invocation into its own Lambda function enforces a clean separation of concerns — the core game logic remains unaware of the AI provider, making it trivial to swap models or add fallback logic. This mirrors a microservices pattern used in production AI-integrated systems.

**WebSocket + AI: complementary patterns**
WebSocket connections handle the real-time human interaction layer (sub-100ms state sync), while the AI invocation path operates as an async event triggered only when AI mode is active. This prevents AI latency from impacting the human multiplayer experience — a critical design consideration for mixed-mode applications.

**Cost-optimized AI integration**
By invoking the Claude API only on AI-mode turns and scoping prompts tightly to game state, the per-game API cost approaches ~$0 — demonstrating that generative AI can be embedded in consumer-grade applications without prohibitive inference cost.

**Tablet as the AI client**
The architecture designates the tablet client as the AI-mode entry point, illustrating how device-specific UX flows can route to entirely different backend paths within the same unified API Gateway — a pattern applicable to multi-persona enterprise applications.

### 💡 Key Architectural Takeaways

- **GenAI as a microservice:** Wrapping Claude API calls in a dedicated Lambda function creates a reusable, independently scalable AI invocation layer — a pattern directly applicable to enterprise AI assistants, copilots, and decision-support tools
- **Stateful WebSocket + stateless AI:** Combining persistent WebSocket connections for real-time UX with stateless AI API calls per turn is a clean architectural boundary that keeps both layers independently testable and deployable
- **Separation of existing and new stacks:** The clean left/right division in the architecture — existing serverless stack vs. new AI additions — reflects a real-world incremental AI adoption pattern, where AI capability is layered onto existing infrastructure without rearchitecting the core
- **Cost-aware AI design:** Scoping Claude API invocations to discrete game events (not continuous streams) demonstrates disciplined prompt engineering and cost governance — skills increasingly valued in enterprise AI solution architecture
- **End-to-end observability:** CloudWatch captures Lambda execution metrics, DynamoDB read/write units, and Claude API response latency in a unified view — providing the operational telemetry needed to manage AI-integrated systems in production

---

## 🛠️ Featured Lab: Tic Tac Toe (Real-Time Multiplayer)

### 📌 Overview

A real-time multiplayer Tic Tac Toe game built on a fully serverless AWS backend. Designed to explore stateful, event-driven architecture using WebSocket APIs — a pattern directly applicable to real-time dashboards, IoT telemetry, and live collaboration tools.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/tictactoe/archive/tttArch.png)](https://github.com/dwardgethub/aws_work_project/blob/main/tictactoe/archive/tttArch.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **DynamoDB** | Game state persistence with fast, predictable key-value access |
| **IAM** | Per-function least-privilege Lambda execution roles |
| **Lambda** | 5 serverless functions handling game logic and player events |
| **API Gateway** | WebSocket API for persistent, bidirectional client connections |
| **S3 + CloudFront** | Secure static frontend hosting with OAC (Origin Access Control) |

### 💡 Key Architectural Takeaways

- **WebSocket vs. REST:** API Gateway WebSocket APIs maintain persistent, stateful connections — unlike REST — enabling low-latency, bidirectional communication essential for real-time multiplayer state synchronization
- **DynamoDB for game state:** The key-value model is well-suited for game state management where fast, predictable read/write performance matters more than relational joins
- **Secure static hosting:** CloudFront + S3 with OAC eliminates direct S3 public exposure — a best-practice pattern for production frontend deployments
- **IAM least-privilege:** Scoping IAM roles per Lambda function enforces fine-grained access control — a critical security practice in multi-function serverless architectures

---

## 🛠️ Featured Lab: Cloud Infrastructure with Generative AI

### 📌 Overview

Accelerate and automate cloud infrastructure deployment and management using AWS CDK and Amazon Q — exploring how generative AI can streamline IaC workflows and reduce manual configuration overhead.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/CloudInfraGenAI.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/CloudInfraGenAI.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **VPC** | Network isolation with security groups |
| **AWS CDK** | Infrastructure-as-Code in Python/TypeScript |
| **Amazon Q** | Generative AI assistant for CDK code generation |
| **CloudFormation** | Underlying stack provisioning engine |
| **NAT GW / Internet GW** | Outbound and inbound internet routing |
| **ALB** | Application Load Balancer for traffic distribution |
| **EC2** | Application and web server compute |
| **RDS** | Managed relational database |
| **S3** | Static asset hosting |

### 💡 Key Architectural Takeaways

- **GenAI-assisted IaC:** Amazon Q can generate, explain, and refine CDK constructs — significantly reducing boilerplate and accelerating infrastructure iteration cycles
- **CDK abstraction over CloudFormation:** CDK provides reusable, testable infrastructure constructs in familiar programming languages, improving maintainability over raw YAML/JSON templates
- **Multi-AZ EC2 deployment:** Deploying EC2 instances across availability zones via CDK with ALB integration demonstrates a scalable, fault-tolerant web tier pattern
- **AI as a force multiplier:** Embedding generative AI into the IaC workflow is a practical model for lean teams managing complex cloud infrastructure

---

## 🛠️ Featured Lab: Analyzing Network Traffic

### 📌 Overview

Detect and block malicious network traffic from a specific IP address using VPC Flow Logs, security group analysis, and Network ACL rules — a core pattern for cloud security incident response.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/AnalyzingNtwkTraffic.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/AnalyzingNtwkTraffic.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **Amazon VPC** | Network boundary and security group enforcement |
| **EC2** | Web servers generating and receiving traffic |
| **S3** | VPC Flow Log storage and static assets |

### 💡 Key Architectural Takeaways

- **VPC Flow Logs as a forensic tool:** Flow logs provide IP-level visibility into accepted and rejected traffic — essential for identifying attack sources and auditing security posture
- **Security Groups vs. NACLs:** Security groups are stateful and instance-scoped; NACLs are stateless and subnet-scoped — understanding when to use each is critical for layered defense
- **NACL for IP blocking:** Network ACLs provide a fast, subnet-level mechanism to block inbound and outbound traffic from specific CIDRs without modifying application-layer rules
- **Defense in depth:** Combining flow log analysis, security group review, and NACL enforcement demonstrates a practical multi-layer network security response pattern

---

## 🛠️ Featured Lab: Auto-Healing and Scaling Applications

### 📌 Overview

Configure EC2 Auto Scaling groups with scheduled scaling rules and CloudWatch monitoring — implementing self-healing, elastically scalable compute infrastructure that responds to workload demand automatically.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/AutoScalingHealing.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/AutoScalingHealing.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **CloudWatch** | Monitoring workload metrics and triggering scaling events |
| **Auto Scaling Group** | Managed EC2 fleet with self-healing and scheduled scaling |
| **EC2** | Web server compute layer |
| **AMI** | Golden image baseline for consistent instance provisioning |
| **S3** | Static asset hosting |

### 💡 Key Architectural Takeaways

- **Scheduled vs. reactive scaling:** Scheduled scaling is ideal for predictable load patterns (e.g., business hours); CloudWatch metric-based scaling handles unexpected demand spikes
- **Auto-healing via health checks:** ASGs automatically replace unhealthy instances using AMI-based reprovisioning — eliminating manual intervention for common compute failures
- **AMI as a deployment artifact:** Baking application state into AMIs ensures consistency across scale-out events and reduces instance bootstrap time
- **CloudWatch as the control plane:** Centralizing metrics, alarms, and scaling triggers in CloudWatch provides a unified operational view across the compute tier

---

## 🛠️ Featured Lab: Connecting VPCs

### 📌 Overview

Implement VPC Peering to enable private, low-latency communication between isolated VPCs — allowing Marketing, Developer, and Finance teams to share backend services without traversing the public internet.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/ConnectingVPCs.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ConnectingVPCs.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **Amazon VPC** | Isolated network environments per business unit |
| **VPC Peering** | Private cross-VPC routing without Transit Gateway overhead |
| **EC2** | Departmental application servers |
| **S3** | Static asset hosting |

### 💡 Key Architectural Takeaways

- **VPC Peering is non-transitive:** A peering connection between VPC-A and VPC-B does not extend to VPC-C — each pair requires its own peering connection, which informs Transit Gateway adoption at scale
- **Route table configuration is explicit:** Peering alone does not route traffic — route table entries must be manually added in both VPCs to enable bidirectional communication
- **Security groups still apply:** VPC peering does not bypass security group rules; fine-grained access control between peered VPCs requires explicit inbound/outbound rule configuration
- **Use case clarity:** VPC Peering is best for simple, low-scale cross-VPC access; Transit Gateway is preferable for hub-and-spoke topologies across many VPCs or accounts

---

## 🛠️ Featured Lab: Data Ingestion Methods

### 📌 Overview

Build a real-time data ingestion and analytics pipeline using Amazon Data Firehose, Lambda, Glue, and Athena — transforming raw clickstream data into queryable insights stored in S3 and DynamoDB.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/DataIngestionMethods.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DataIngestionMethods.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **Data Firehose** | Managed real-time data ingestion and delivery |
| **Lambda** | In-stream data transformation |
| **Glue** | Schema discovery and data cataloging |
| **Athena** | Serverless SQL queries over S3 data |
| **DynamoDB** | Real-time analytics sink for processed records |
| **S3** | Raw and transformed data lake storage |
| **EC2** | Clickstream data source |

### 💡 Key Architectural Takeaways

- **Firehose as a managed ETL entry point:** Firehose handles buffering, batching, and delivery to S3/DynamoDB without managing Kafka or custom stream consumers — ideal for straightforward ingestion pipelines
- **Lambda for in-flight transformation:** Embedding Lambda in the Firehose stream enables lightweight data enrichment or filtering before persistence, avoiding costly post-load transformations
- **Glue + Athena as a serverless analytics layer:** Glue crawlers automatically infer schema from S3 data, enabling Athena to run ad-hoc SQL without provisioning a data warehouse
- **Dual-sink architecture:** Writing to both S3 (historical analysis) and DynamoDB (real-time lookup) supports both batch and operational analytics use cases from a single pipeline

---

## 🛠️ Featured Lab: Decoupling Applications

### 📌 Overview

Improve application availability and fault tolerance by decoupling microservices using SNS fan-out and SQS queuing — implementing an event-driven architecture with dead-letter queue protection against message loss.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/DecouplingApps.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DecouplingApps.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **SNS** | Fan-out topic distributing events to multiple subscribers |
| **SQS** | Durable message queues for async consumer processing |
| **Lambda** | Event-driven microservice consumers |
| **Firehose** | Stream delivery to analytics pipeline |
| **EC2** | Message producer application |
| **S3** | Static asset and data storage |

### 💡 Key Architectural Takeaways

- **SNS + SQS fan-out pattern:** Decoupling producers from consumers via SNS-to-SQS allows independent scaling, failure isolation, and multiple downstream consumers without tight service coupling
- **Dead-letter queues (DLQ) as a safety net:** Routing unprocessable messages to a DLQ prevents message loss and enables forensic analysis of processing failures — a critical pattern for production reliability
- **Async processing improves resilience:** Removing synchronous dependencies between services means a downstream failure no longer cascades upstream — a foundational microservices design principle
- **Firehose integration:** Subscribing Firehose to an SNS topic enables parallel stream archiving alongside real-time processing — supporting both operational and analytical workloads from a single event source

---

## 🛠️ Featured Lab: Deploying APIs Gradually

### 📌 Overview

Deploy a serverless API using AWS SAM with canary and linear traffic shifting via CodeDeploy — enabling controlled, low-risk rollout of new Lambda versions with automated rollback on failure.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/DeployingAPIsGradually.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/DeployingAPIsGradually.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **AWS SAM** | Serverless Application Model for IaC and local testing |
| **Lambda** | Versioned serverless function with traffic shifting |
| **API Gateway** | REST API frontend routing to Lambda |
| **CodeDeploy** | Canary and linear deployment orchestration |
| **CloudFormation** | Underlying stack management |

### 💡 Key Architectural Takeaways

- **Canary deployments reduce blast radius:** Routing a small percentage of traffic to a new Lambda version before full rollout limits user impact if the new version contains defects
- **Linear traffic shifting adds control:** The `Linear10PercentEvery1Minute` strategy provides a gradual, observable rollout — giving CloudWatch alarms time to detect anomalies and trigger automatic rollback
- **SAM simplifies serverless IaC:** SAM's higher-level abstractions over CloudFormation reduce template verbosity and provide local testing capabilities — accelerating the serverless development cycle
- **CodeDeploy + Lambda = production-grade CI/CD:** Combining versioned Lambda aliases with CodeDeploy deployment groups brings enterprise deployment safety patterns to serverless architectures

---

## 🛠️ Featured Lab: Highly Available Web Applications

### 📌 Overview

Deploy a web application across multiple Availability Zones with an Application Load Balancer, Auto Scaling, and health checks — implementing a production-grade, regionally resilient architecture with automated failover.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/HighlyAvailableWebApp.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/HighlyAvailableWebApp.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **ALB** | Layer 7 load balancing with health-check-based routing |
| **Auto Scaling Group** | Multi-AZ EC2 fleet with automated scaling and replacement |
| **EC2** | Web server compute across 3 AZs |
| **RDS** | Managed relational database |
| **CloudFront** | Global CDN for frontend asset delivery |
| **Route 53** | DNS routing |
| **CloudWatch** | Health monitoring and scaling triggers |

### 💡 Key Architectural Takeaways

- **Multi-AZ as the HA baseline:** Distributing EC2 instances across 3 AZs ensures application availability survives a single AZ outage — a fundamental AWS Well-Architected reliability pattern
- **ALB health checks as the control loop:** The ALB continuously probes instance health and routes traffic only to healthy targets — enabling seamless failover without manual intervention
- **ASG + ALB integration:** Combining Auto Scaling with load balancer target group registration automates capacity management and ensures new instances receive traffic immediately upon passing health checks
- **CloudFront offloads origin:** Caching static assets at edge locations reduces EC2 and ALB load, improving global latency and reducing infrastructure cost at scale

---

## 🛠️ Featured Lab: Introduction to Generative AI

### 📌 Overview

Deploy a hosted foundation model on Amazon SageMaker and integrate it into a serverless application via API Gateway and Lambda — demonstrating a production-relevant pattern for embedding AI inference into cloud-native architectures without managing underlying compute.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/Intro2GenerativeAI.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/Intro2GenerativeAI.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **SageMaker** | Foundation model hosting and managed inference endpoint |
| **Lambda** | Serverless inference invocation and response handling |
| **API Gateway** | REST API frontend for application integration |
| **CloudFront** | CDN delivery for frontend assets |
| **S3** | Static frontend hosting |
| **EC2** | Sample application server |

### 💡 Key Architectural Takeaways

- **SageMaker endpoints decouple AI from application logic:** Lambda invokes the model via a clean API boundary — allowing model swaps (e.g., base model → Falcon-7B) without changes to application code
- **Serverless AI inference pattern:** API GW + Lambda + SageMaker forms a reusable, scalable inference architecture applicable to chatbots, document processing, and intelligent automation use cases
- **Model portability via endpoint abstraction:** Updating only the Lambda environment variable pointing to a new SageMaker endpoint enables zero-downtime model upgrades
- **Open-source models on SageMaker:** Hosting models like Falcon-7B offers data-privacy and cost advantages over third-party API calls — particularly relevant for enterprise workloads with sensitive data requirements

---

## 🛠️ Featured Lab: Parallel Data Processing

### 📌 Overview

Implement an SNS-based parallel processing architecture that distributes rideshare event data across multiple Lambda consumers — with subscription filtering, CloudWatch observability, and a fan-out pattern that scales processing capacity independently per service.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/ParallelDataProcessing.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ParallelDataProcessing.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **SNS** | Central fan-out topic with per-subscription filter policies |
| **Lambda** | Independent parallel consumers per business function |
| **API Gateway** | Event ingestion endpoint |
| **DynamoDB** | Processed event persistence |
| **CloudWatch** | Log aggregation and cross-function performance monitoring |

### 💡 Key Architectural Takeaways

- **SNS filter policies reduce noise:** Subscribing Lambda functions with attribute-based filters (e.g., `distance > 10`) ensures each consumer only processes relevant events — reducing unnecessary invocations and cost
- **Parallel processing scales per domain:** Each Lambda function scales independently based on its own SNS subscription throughput — avoiding bottlenecks from a single shared consumer
- **CloudWatch Logs Insights for observability:** Aggregating logs across multiple Lambda functions in a single Insights query provides end-to-end pipeline visibility without external tooling
- **Event-driven fan-out vs. direct invocation:** SNS-based fan-out is more resilient and extensible than synchronous Lambda chaining — new consumers can be added without modifying the producer

---

## 🛠️ Featured Lab: Resource Governance

### 📌 Overview

Implement AWS Config managed rules to enforce security and compliance standards across S3 and EC2 resources — automating configuration compliance checks and establishing a governance baseline for cloud infrastructure.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/ResourceGovernance.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/ResourceGovernance.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **AWS Config** | Continuous configuration compliance monitoring and rule enforcement |
| **S3** | Target resource for encryption and versioning compliance rules |
| **EC2** | Target resource for tagging compliance rules |

### 💡 Key Architectural Takeaways

- **Config rules as a compliance control plane:** Managed rules provide continuous, automated enforcement of security baselines — replacing manual audits with real-time drift detection
- **Tagging governance at scale:** Enforcing resource tagging via Config enables cost attribution, ownership tracking, and automated lifecycle management across large AWS environments
- **S3 encryption + versioning as baseline controls:** Requiring KMS encryption and versioning on all S3 buckets addresses two of the most common data protection gaps in enterprise cloud deployments
- **Config as a foundation for remediation:** Config rule violations can trigger Lambda-based auto-remediation — establishing a closed-loop governance model aligned with IEC 62443 and SOC 2 requirements

---

## 🛠️ Featured Lab: Single-Page Application

### 📌 Overview

Deploy and troubleshoot a serverless single-page application using S3, API Gateway, Lambda, and DynamoDB — with CloudWatch Logs used to diagnose and resolve Lambda execution issues in a production-like environment.

### 🗺️ Architecture Diagram

[![AWS Topology Diagram](https://github.com/dwardgethub/aws_work_project/raw/main/CloudQuest2/Single-PageApp.png)](https://github.com/dwardgethub/aws_work_project/blob/main/CloudQuest2/Single-PageApp.png)

### 🚀 Key Services Used

| Service | Role |
|---|---|
| **S3** | Static SPA hosting with website endpoint configuration |
| **API Gateway** | REST API routing frontend requests to Lambda |
| **Lambda** | Backend business logic and DynamoDB data retrieval |
| **DynamoDB** | Vehicle records data store |
| **CloudWatch** | Lambda execution log analysis and troubleshooting |

### 💡 Key Architectural Takeaways

- **S3 static hosting + API GW = fully serverless SPA:** This pattern eliminates web server management entirely — reducing operational overhead while maintaining scalability and low latency
- **CloudWatch Logs as the primary debugging tool:** Structured Lambda logs enable rapid root-cause analysis of function errors without SSH access or server-side tooling
- **API GW invoke URL as the integration point:** Correctly configuring the frontend to target the API GW invoke URL is a common production gotcha — environment-specific configuration management is essential
- **DynamoDB for record retrieval:** The key-value access pattern of DynamoDB aligns well with detail lookups by record ID — providing consistent, low-latency responses at any scale

---

*Portfolio maintained by Dennis Ward | MIT EE | AWS Certified Solutions Architect | [LinkedIn](https://www.linkedin.com/in/dennisward)*
