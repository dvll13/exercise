### AWS services:

- Compute
- Generative AI
- Database and Storage
- Content delivery
- Specialized services

Client -> Request -> Server validation -> Response

## Cloud computing

This is the **on-demand delivery of IT resources** (servers, storage solutions, databases, networking components, artificial intelligence and machine learning (AI/ML) tools, and more) over the Internet **with flexible pay-as-you-go pricing**. Customers can use these resources to **build, deploy, and manage applications and services through the cloud infrastructure**, rather than maintaining local hardware or software.

### Cloud deployment types

- **cloud** - move or create resources in the Cloud;
- **on-premises** - it is sometimes sought for its ability to provide dedicated resources and low latency; it's the same as legacy IT infrastructure while using application management and virtualization technologies to try increasing resource utilization, but doesn't provide some of the Cloud benefits;
- **hybrid** - in a hybrid deployment, cloud-based resources and on-premises infrastructure work together. This approach is ideal for situations where legacy applications must remain on premises due to maintenance preferences, sensitive data or regulatory requirements. Multi-cloud deployments can also be considered hybrid deployments.

### Benefits of the AWS Cloud

- **flexible pay-as-you-go** - you can use build-in budgeting tools to find ways to save money each month
- massive **economies on scale** - large worldwide infrastructure available at lower cost to the clients
- **stop guessing capacity** - you could buy less or more infrastructure that's needed throughout the years (dynamically scale)
- increase **speed and agility** - you can provision and deprovision resources when needed (e.g. for quickly responding to new market needs, trying things, etc.)
- **stop spending money and time** on running and providing own **data centers**
- **go global** in minutes - we can also choose in which **region/s** to deploy our apps

## Introduction to AWS Global Infrastructure

**Hight availability and Fault tolerance (multiple layers failure handling)** - multiple groups of datacenters make sure the apps stay accessible with minimal downtime

**AWS Regions** are physical locations around the world that contain groups of data centers. These groups of data centers are called **Availability Zones (AZs)**. Each AWS Region consists of a minimum of 3 physically separate Availability Zones within a geographic area. If one region fails, another covers.

An **Availability Zone** consists of **one or more data centers** with redundant/independent power, networking, and connectivity. Regions and Availability Zones are designed to provide low-latency, fault-tolerant access to services for users within a given area.

It's recommended to **distribute your resources across multiple AZs**. That way, if one AZ encounters an outage, your business applications will continue to operate without interruption. With this approach of redundancy and resource isolation, AWS customers can achieve the **benefits of high availability and fault tolerance**.

You should choose locations **closer to your clients** for lower latencies.

### The AWS Shared Responsibility Model

**Customers are responsible** for managing security requirements for their data and client-side encryption.

Depending on the service used, **responsibilities might shift between the customer and AWS**. Components such as server-side encryption, network traffic protection, platform and application management, and OS, network, and firewall configuration vary by service in terms of who is responsible for these items.

**AWS is responsible** for protecting the infrastructure that runs all of the services offered in the AWS Cloud.

## Computing - Amazon Elastic Compute Cloud (Amazon EC2)

Essentially, _compute in the cloud_ means creating virtual machines with a cloud provider to run applications and tasks over the internet.

**EC2** instances are Virtual Machines (**VMs**). They are isolated from each other and share an underlying **host machine** (and its resources) with multiple other instances, which is a concept called **multi-tennancy**.

The job of **resource sharing and isolation** is being done by a piece of software called **hypervisor**, which is running on the host machine.

Vertically scaling instance - you can give an instance more memory or cpu.

You can **launch and stop** instances and **pay only for their compute tim**e when running.

When **launching an EC2 instance**, you start by selecting an **Amazon Machine Image (AMI)**, which defines the operating system and might include additional software. You also choose an **instance type**, which determines the underlying hardware resources, such as CPU, memory, and network performance.

You can **connect to an EC2 instance** in various ways (SSH, RDP, AWS Systems Manager, etc.) and then manage it.

**Instance types** are grouped in **Instance Families**, which offer various combinations of resources. IFs are:

- **General purpose** - balanced resources (for diverse workloads, web servers, code repos, or when you are not sure how workload will perform ahead of time)
- **Compute optimized** - compute intensive tasks (gaming servers, high-performance computing (HPC), ML and scientific modeling)
- **Memory optimized** - memory intensive tasks (e.g. fast performance for workloads that process large data sets in memory)
- **Accelerated computing** - floating point calculations, graphics processing, data pattern matching. They use hardware accelerators (co-processors like GPUs that perform functions more efficiently than SW run on CPUs)
- **Storage optimized** - high performance for locally stored data, such as large databases, data warehousing, and I/O-intensive applications.

After chosing the Instance Type, then we should **choose the Instance Size** (or resources, which reflects price).

We can **change the types** whenever we want.

## How to Provision AWS Resources

**Instance managment** is done by using **API Requests**.

There are 3 ways of interacting with AWS Services:

- AWS Management Console (browser based)
- AWS CLI - makes automation through scripting possible
- AWS SDK - interact with AWS through various programming languages (e.g. C++, Java, and .NET)

### Amazon Machine Images (AMIs)

An AMI is a template that **includes the operating system, storage setup, architecture type, permissions for launching, and any extra software that is already installed**. You can use one AMI to **launch several EC2 instances** that all have the same setup.

_AMIs can be used in **three ways**:_

- **create your own** by building a custom AMI with specific configurations and software tailored to your needs.
- use **pre-configured AWS AMIs**, which are set up for common operating systems and software.
- **purchase AMIs from the AWS Marketplace**, where third-party vendors offer specialized software designed for specific use cases.

### AWS pricing options

**Capacity Reservations** - with Amazon EC2 Capacity Reservations, you **reserve compute capacity** in a specific Availability Zone for critical workloads. Reservations are charged at the **On-Demand rate**, whether used or not. You only pay for the instances you run. This is ideal for _strict capacity requirements_ for current or _future business-critical workloads_.

- **On-Demand Instances -** pay **only for the compute capacity** you consume with no upfront payments or long-term commitments required. The customer can test and adjust based on actual usage before committing to longer-term options
- **Reserved Instances -** get a savings of up to 75 percent over On-Demand pricing by applying discounts across instance sizes and multiple Availability Zones within a Region, committing to a **1-year or 3-year term** for predictable workloads using specific instance families and AWS Regions. When you purchase a Reserved Instance, AWS automatically applies the discount to other instance sizes within the same family based on the instance size footprint. It also applies the discount across multiple Availability Zones for enhanced resource distribution and fault tolerance
- **Spot Instances -** bid on spare compute capacity at up to **90 percent off the On-Demand price**, with the flexibility to be **interrupted** when AWS reclaims the instance (e.g. batch processing workload that can tolerate occasional interruptions)
- **Savings Plans - s**ave up to 72 percent across a variety of instance types and services by committing to a **consistent usage level for 1 or 3 years** (commitment to use a specified amount of compute power (measured per hour)). Payment options include All upfront, Partial upfront, or No upfront. Good for _predictable workloads_
- **Dedicated Hosts - r**eserve an **entire physical server for your exclusive use**. This option offers full control over instances placement and resource allocation and is ideal for workloads with _strict security or licensing needs_
- **Dedicated Instances** - pay for **instances running on hardware dedicated solely to your account**. This option provides isolation from other AWS customers

## Scaling Amazon EC2

If you've ever tried to access a **website that wouldn't load** and kept timing out, it might have been **overwhelmed** by more requests than it could handle.

**Scalability** is about a system’s potential to grow over time by adding **resources** (scale up) or more **machines** working in parallel (scale out). Scalability focuses on **long-term capacity planning** to make sure that the system can grow and accommodate more users or workloads as needed.

**Elasticity** is the ability to automatically scale resources up or down in response to real-time demand. Elasticity provides cost efficiency and optimal resource usage **at any given moment**.

### **Amazon EC2 Auto Scaling**

Amazon EC2 Auto Scaling **automatically adjusts the number of EC2 instances** based on changes in application demand, providing better availability. It offers two approaches. _Dynamic scaling_ adjusts in real time to fluctuations in demand. Predictive scaling preemptively schedules the right number of instances based on anticipated demand.

You can create **Auto Scaling groups**, which are collections of EC2 instances that can scale in or out to meet your application’s needs. They are configured with the following three _key settings_: **Minimum Capacity** (starts with it)**, Desired Capacity (defaults to your minimum capacity), Maximum Capacity**.

EC2 Auto Scaling uses EC2 instances, you **pay for only the instances you use**, when you use them. This gives you a cost-effective architecture that provides the best customer experience while reducing expenses.

EC2 Auto Scaling to work **requires some other AWS services** to make it all happen (to collect different metrics). **Amazon CloudWatch** would be used for that.
