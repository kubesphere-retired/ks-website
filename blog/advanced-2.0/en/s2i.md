---
title: "Source-to-Image: Build and Deploy Spring Boot Application to KubeSphere"
---

## Objective

This tutorial will guide you Source to Image feature through setting up an example instance of KubeSphere deployment with your Spring Boot application. To elaborate this feature, we will create a Deployment and use a [Spring Boot sample repository](https://github.com/kubesphere/springboot-sample), demonstrating how to use Source to Image in KubeSphere to implement build images, automatically push to the Docker Hub, and finally deploy to the Kubernetes Namespace.


## What is Source to Image

Source-to-Image(S2I) is intended for building reproducible container images from source code. It enable users built and run a new container image from source code in a git repository, no Dockerfile necessary.

## Prerequisites

- You have a personal [GitHub](https://github.com/) and [DockerHub](http://www.dockerhub.com/) account, and you need to fork the [Spring Boot sample repository](https://github.com/kubesphere/springboot-sample) to your GitHub account.
- You've completed all steps in [Tutorial 1](admin-quick-start.md).

## Hands-on Lab

### Step 1: Create Secrets

Sign in with `project-regular` account and enter into the `demo-project`, navigate to **Configuration Center → Secrets**, click on the **Create** button to create a GitHub and DockerHub secret respectively.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190717175549.png)

|Secret Name|Type|Registry URL|User Account/Password|
|---|---|---|---|
|dockerhub-id|Image Repository Secret|docker.io|Enter with your personal DockerHub account and password|
|github-id|Account Pssword Secret|\|Enter with your personal GitHub account and password|

**Newly Created Secrets**

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190717175741.png)

### Step 2: Create a Deployment

2.1. Select **Workloads → Deployments** at the left menu, then click **Create Deployment**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190717180338.png)

2.2. Fill in the basic information in the pop-up window. e.g. `Name: springboot-s2i`, then click **Next** when you've done.

2.3. Click on the **Add Container** button, choose `Build a new container image from code`, then fill in the table with the following listed values:

- Code URL: `https://github.com/{$YOUR_GITHUB_ACCOUNT}/springboot-sample`
- BuilderImage: Select `kubesphere/java-8-centos7:advanced-2.0.0`
- ImageName: Can be customized, e.g. `{$YOUR_DOKCERHUB_ACCOUNT}/springboot` (tag: latest)
- Secret: Inject the secret `github-id` into the S2I Pod
- Target image repository: Choose the secret `dockerhub-id` we created in the previous step

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718095825.png)

2.4. Scroll down to **Service Settings**, the Port name Can be customized, and the port number is **8080**, then click **Save**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718112803.png)

2.5. Choose **Next** to skip Volume Settings and Label Settings, then click on the **Create** button. At this point, we can see that the S2I sample deployment has been created successfully, which is showing **building image**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718100557.png)

2.6. Click into the `springboot-s2i`, the building logs is being output in real time, it will create a S2I job simultaneously, which is used to push the build image to the target registry.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718100908.png)

The S2I sample build completes successfully after a few minutes.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718115255.png)

### Step 3: Create a Service

3.1. Next we are going to create a service to expose externally. Choose **Network & Services → Services** on the left menu, then click on the **Create** button.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718102443.png)

3.2. Fill in the basic information, e.g. `Name : s2i-service`, choose the first item `Virtual IP: Access the service through the internal IP of the cluster`. Then click on the `Specify Workload` and choose `springboot-s2i` deployment, click **Save** to back to the service settings table.

3.3. We can expose this service outside using Service Port **8080** and Container Port **8080** with TCP protocol, the port name can be customized. Then click on the **Next**.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718112621.png)

3.4. Click **Next** to skip Label Settings, then choose **NodePort** as the Access Method from the dropdown list. Finally, click **Create** to complete the service creation.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718105444.png)

3.5. As we can see from list, the `s2i-service` has been created successfully, the Virtual IP and Port as shown below, which is intended for accessing the service.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718112547.png)

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718113210.png)

### Step 4: Verify the Service and Image Push

4.1. At this point, we can access the `s2i-service` in browser, or curl this service directly.

Now, let's call the service, click on the **Click to visit** button, the spring boot sample service comes out.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718113343.png)

```bash
# curl {$Virtual IP}:{$Port} or curl {$Node IP}:{$NodePort}
$ curl 10.233.60.196:8080
Hello,World!
```

4.2. The spring boot sample image has been pushed to your personal DockerHub automatically as following.

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190718113818.png)

## Next Step

Tutorial 9 - [Bookinfo Microservice Application: Canary Release using Istio](canary-release.md)