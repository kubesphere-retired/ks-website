---
title: "Wordpress Application Tutorial: Deploy a MySQL StatefulSet" 
---

## Objective 

In this tutorial we will create a StatefulSet as an example, demonstrating how to deploy MySQL as a stateful application in KubeSphere. The MySQL initial password for this example will be created and saved as Secret.

## Prerequisites

- You need to create a workspace and project, see the [Tutorial 1](admin-quick-start.md) if not yet.
- You need to sign in with `project-regular` and enter into the corresponding project.

## Hands-on Lab

### Step 1: Create a Secret

1.1. Enter into `demo-project`, navigate to **Configuration Center → Secrets**, then click **Create**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716180335.png)

1.2. Fill in the basic information, e.g. `Name : mysql-secret`. Then choose **Next** when you're done. 

1.3. Data is composed of a set of key-value pairs, fill in the key/value with `MYSQL_ROOT_PASSWORD` and `123456`

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716180525.png)

### Step 2: Create a StatefulSet

2.1. Navigate to **Workload → StatefulSets**, then click **Create StatefulSet**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716180714.png)

2.2. Fill in the basic information, e.g. `Name : mysql`, then click **Next**. 

2.3. Click **Add Container**, then fill in the table according to following list:


- Image: `mysql:5.6`
- Container Name: mysql
- Limit of Memory: Set `1024` Mi (i.e. 1 Gi)
- Service Settings
    - Name: port
    - Protocol: TCP
    - Port: 3306
- Environmental Variables: Check the box and click **Reference Config Center**:
    - Name: MYSQL_ROOT_PASSWORD
    - Secret: Choose `mysql-secret` that we created in the step 1
    - Key: Select `MYSQL_ROOT_PASSWORD`

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716193052.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716193727.png)

2.4. Other blanks could be remained default values, click **Save** when you've done. Then click **Next** to jump to the **Volume Template**.

2.5. Click **Add Volume Template**, then fill in the Volume Template with the following values:

- Volume Name: `mysql-pvc`
- Description: MySQL persistent volume
- Storage Class: e.g. local (Depends on your storage class configuration)
- Capacity: 10 Gi by default
- Access Mode: ReadWriteOnce (RWO)
- Mount Path: `/var/lib/mysql`

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716194134.png)

Then choose **Save** and click **Next** when you're done.


2.6. Fill in the Service Config table with the following information:

- Service Name: `mysql-service` (The Service Name defined here will be associated with Wordpress)
- Ports:
   - name: port
   - protocol: TCP
   - port: 3306
   - target port: 3306

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716194331.png)


Click **Next → Create** directly, the MySQL StatefulSet has been created successfully.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716195219.png)

> Note: You will be able to see the MySQL StatefulSet displays "updating" since this process requires a series of operations, such as pulling a Docker image, creating a container, and initializing the database. Normally, it will change to "running" at around 1 min.

### Step 3: Inspect the MySQL Application

Enter into the MySQL StatefulSet, you could find that details page includes Resource Status, Revision Control, Monitoring, Environmental Variables and Events.

**Resource Status**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716195604.png)

**Monitoring Data**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716195732.png)

**Events List**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190716200230.png)

So far, MySQL Stateful application has been created successfully, it will be served as the backend database of the WordPress application.

## Next Step

Tutorial 4 - [Wordpress Application Tutorial: Create a Wordpress Deployment](wordpress-deployment.md).