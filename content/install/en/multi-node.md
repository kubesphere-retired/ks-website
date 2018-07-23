###  Multi-node Mode

`Multi-node` mode means multiple nodes deployment, for example, single or multiple `master(s)`, multiple `nodes`, and multiple  `etcd` nodes. it is recommended to prepare at least `2` nodes and deploy to production environment.

**Note：**  <br/>


> It is recommended to select any one host in the cluster being served as a role of "`taskbox`" to execute installation task for other hosts before Multi-node deployment, and "`SSH Communication`" is required to be established between "taskbox" and other hosts.



****


#### Step 1: Provision Linux Host

##### Prerequisites

The following section identifies the hardware specifications and system-level requirements of hosts within KubeSphere platform environment. To get started with Multi-node mode, you may need to prepare at least `2` hosts refer to the following specification.

##### Hardware Recommendations

| **Roles** | **Minimum Recommended** |
| --- | --- |
| **master** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |
| **node** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |
| **etcd** | Operating System：ubuntu16.04<br/>CPU：To be defined<br/>Memory：To be defined<br/>Disk：To be defined |



####  Step 2: Deployment Scenarios(Example description)

Take 192.168.0.10 (node1), 192.168.0.20 (node2) and 192.168.0.30 (node3) as an example.


**Attention: <br/>**
> node1 will be served as a role of "taskbox" to execute installation task, the host name of each node can be customized by the user.

##### Cluster Architecture

**Single master, Single etcd, Multiple nodes**
![](../images/pic04_en.png)



**Note:**  <br/>

> etcd is a distributed key value store that provides a reliable way to store data across a cluster of machines. The number of etcd node is required at least one. For high availability, it is recommended to deploy multiple etcd nodes, which can makes the Kubernetes cluster more reliable. The number of etcd nodes is recommended to be set to `odd number`. KubeSphere Express version just temporarily supports single etcd, we are going to support multiple etcd in the next AE version soon.


| **Host IP** | **Roles** |
| --- | --- |
| 192.168.0.10 | master , node , etcd |
| 192.168.0.20 |  node |
| 192.168.0.30 |  node |






####  Step 3: Provision Installation Files

**1.**  **KubeSphere** official download address：

[KubeSphere Installer download](https://drive.yunify.com/s/jV8QSnO8KkWLu4V) （To be updated）

**Note：**  <br/>

> If you can not connect to network, please refer to [Disconnected Installation Instructions](#disconnected-installation-instructions-to-be-defined)



**2.**  When you get the installation package, please execute following commands to unzip the package.

```
  $ tar -zxvf kubesphere-all-express-1.0.alpha.tar.gz
```

**3.** Go into “`kubesphere-express-1.0.alpha`” folder

```
  $ cd kubesphere-express-1.0.alpha
```

**Attention: taskbox is required to configure "SSH password-less login", you can refer to [SSH Password-less Login Configuration Instructions ](#ssh-password-less-login-configuration-instructions) if needed.**

**4.** Execute following command to edit **`hosts.ini`** via Vim.：

```
$ vi conf/hosts.ini
```

**5.** In order to manage deployment process and target machines configuration, please refer to the following scripts to configure all hosts in `hosts.ini`,

**Attention：**

> There are 3 hosts in example and each host name can be customized by the user like "node1", "node2" and etc. "node1" is the taskbox as well as the local host.


**Example**

```
[all]
node1  ansible_connection=local local_release_dir={{ansible_env.HOME}}/releases ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node2  ansible_host=192.168.0.20 ip=192.168.0.20 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node3  ansible_host=192.168.0.30 ip=192.168.0.30 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password

[kube-master]
node1

[kube-node]
node1
node2    
node3


[etcd]
node1


[k8s-cluster:children]
kube-node
kube-master 
```


**Note：** <br/>

> - Each node's parameters like Internal IP and its password needs to be filled into [all] field. In this example, since "node1" served as `taskbox`, it just needs to replace "ansible_become_pass" with the current host password in the first line.
> - Other nodes like "node2" and "node3", for "ansible_host" and "ansible_become_pass" need to be replaced by their actual Internal IP and host password respectively in [all] field.
> - "node1" is served as the taskbox which is to execute installation for whole cluster, as well as the role of master and etcd, so "node1" needs to be filled into [kube-master] and [etcd] field.
> - At the same time, for "node1","node2" and "node3", they serve the role of node as well, so all of the hosts name need to be filled into [kube-node] field.



**6.** It is extremly recommended to prepare a server for storage service before Multi-node deployment. Then you will need to specify the storage class parameters in  **`vars.yml`** via Vim. Execute following command to edit `vars.yml`:

```
  $ vi conf/vars.yml
```


**Note：**  <br/>

> - You may to modify the relevant configurations like network or storage class, otherwise it will be executed with default parameters without any modifications**

> - Network：KubeSphere supports `calico` by default

> - Supported Storage Classes：`GlusterFS、CephRBD`

> **For details on storage configuration, please refer to [Storage Configuration Instructions](#storage-configuration-instructions)**  


####  Step 4: Get Started With Deployment

The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, all of these procedures will be automatically processing in this deployment.

The KubeSphere installation package will automatically install the relevant dependent software as following table described.

##### Software Recommendations

| **Dependent Software** | **Supported Version** |
| --- | --- |
| Ansible | v2.4 (or newer) |
| Python-netaddr | v0.7.18(or newer) |
| Jinja | v2.9 (or newer) |


Following section describes how to get started with Multi-node mode deployment.

> The current system is Ubuntu 16.04. It is recommended to use ubuntu as default user to complete following steps.

Following section describes how to start `Multi-node` deployment.

**1.** Go into `scripts`(If current location is in kubesphereinstaller)

```
$ cd scripts
```

**2.** Execute **`install.sh`**：

```
$ ./install.sh
```

**3.** Enter`2` to select `Multi-node` mode to start：
![](../images/pic08.png)

**Attention：** <br/>

> If any errors occur, you can check according to the error message, please give us feedback as well.


**4.** Test **KubeSphere** Multi-node Deployment：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready.

![](../images/pic01.png)

**(2).**Then you will be able to access KubeSphere login page with the IP address of the host and correct port. The port number will be automatically generated in the result page as above screenshot showing "ks-console-nodeport:32117". <br/>
**Example**： [http://139.198.121.143:31413](http://139.198.121.143:31413)
<br/>
![](../images/pic02.png)


#### Summary
When KubeSphere is deployed successfully ，you will be able to follow with [*"KubeSphere User Guide"*](www.qingcloud.com)，then log in to KubeSphere and learn how to get started with it！


****



## Appendix

### **Disconnected Installation Instructions**  (To be defined)

To be defined


****


### **Storage Configuration Instructions**

#### Storage classes configuration

KubeSphere supports GlusterFS or CephRBD to serve as persistent volume plugin in Multi-node mode deployment, **you will need to prepare the corresponding storage server first.**

You just need to specify the storage class like Ceph RBD , GlusterFS or local volume at `# Ceph_rbd  deployment` , `# GlusterFS  provisioner deployment` or `# Local volume provisioner deployment(Only all-in-one)` part in `vars.yml` according to the storage server configuration. Please reference following table and refer to the example hints in `vars.yml` to modify the parameters for storage class configuration

**Note:**<br/>

> KubeSphere installation will automatically install the on-demand storage client like Ceph RBD Client or GlusterFS Client in Kubernetes cluster, which depends on the storage server configuration, no need to install the client manually.

If you would like to use `local\volume`, it is recommended to mount a volume that meets the capacity in this path:（ _**local\volume\provisioner\base\dir**_）
<br/>
**Note:** <br/>

>`local\volume` is only applicable in All-in-one mode
 

For `Ceph` deployment, please refer to [ **Install Ceph** ](http://docs.ceph.com/docs/master/) or  [ **Containerized Ceph cluster** ](https://github.com/ceph/ceph-docker)

For `Gluster`deployment, please refer to [**Install Gluster**](https://www.gluster.org/install/) or [**Gluster Docs**](http://gluster.readthedocs.io/en/latest/Install-Guide/Install/), and it requires [Heketi](https://github.com/heketi/heketi/tree/master/docs/admin) for management.



**Attention:**<br/>

> Kubernetes is not allowed exits both 2 kinds of storage class at the same time,  please make sure there is not a default storage class in Kubernetes cluster before you are going to specify the storage class. 

Following tables describe different storage classes parameters specification, For `Storage Class` details please refer to [**storage classes**](https://kubernetes.io/docs/concepts/storage/storage-classes/) as well.

| **Local volume** | Description |
| --- | --- |
| **local\_volume\_provisioner\_enabled** | **Whether to use "local\_volume" as persistent volume plugin, Yes:&quot;true&quot; No:&quot;false&quot;** |
| **local\_volume\_provisioner\_storage\_class** | **storage\_class name,   Default value：local-storage** |
| **local\_volume\_provisioner\_namespace** | **the namespace of relevant local\_volume object,  Default value：kube-system** |
| **local\_volume\_is\_default\_class** | **Whether to set it as default storage\_class, Yes:&quot;true&quot; No:&quot;false&quot;<br/> Attention：It is  allowed to set only one kind of storage class as default\_class** |
| **local\_volume\_provisioner\_base\_dir** | **Host mounted path,  Default value：/mnt/disks** |

<br/>

| **Ceph\_RBD** | Description |
| --- | --- |
| **ceph\_rbd\_enabled** | **Whether to use ceph\_RBD as persistent storage volume,   Yes:&quot;true&quot; No:&quot;false&quot;** |
| **ceph\_rbd\_storage\_class** | **storage\_class name** |
| **ceph\_rbd\_is\_default\_class** | **Whether to set it as default storage\_class, Yes:&quot;true&quot; No:&quot;false&quot; <br/> Attention：It is  allowed to set only one kind of storage class as default\_class** |
| **ceph\_rbd\_monitors** | **Ceph monitors, comma delimited. This parameter is required, which depends on Ceph RBD server parameters. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_admin\_id** | **Ceph client ID that is capable of creating images in the pool. Default is “admin”. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_admin\_secret** | **Admin_id's secret，Secret Name for "adminId". This parameter is required. The provided secret must have type “kubernetes.io/rbd”. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_pool** | **Ceph RBD pool. Default is “rbd”. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_user\_id** | **Ceph client ID that is used to map the RBD image. Default is the same as adminId，Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_user\_secret** | **secret for User_id, it is required to create this secret in namespace which used rbd image，Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_fsType** | **fsType that is supported by kubernetes. Default: "ext4". Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
| **ceph\_rbd\_imageFormat** | **Ceph RBD image format, “1” or “2”. Default is “1”. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)** |
|**ceph\_rbd\_imageFeatures**| **This parameter is optional and should only be used if you set imageFormat to “2”. Currently supported features are layering only. Default is “”, and no features are turned on. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)**|

**Attention:**<br/>
> The on-demand ceph secret which being created in storage class, like "ceph_rbd_admin_secret" and "ceph_rbd_user_secret", it can be returned with following command in Ceph storage server.

```
$ ceph auth get-key client.admin
```
<br/>

| **GlusterFS（It requires glusterfs cluster which is managed by heketi）**|Description |
| --- | --- |
| **glusterfs\_provisioner\_enabled** | **Whether to use glusterfs as persistent storage volume,    Yes:&quot;true&quot; No:&quot;false&quot;** |
| **glusterfs\_provisioner\_storage\_class** | **storage\_class name** |
| **glusterfs\_is\_default\_class** | **Whether to set it as default storage\_class, Yes:&quot;true&quot; No:&quot;false&quot; <br/> Attention：It is  allowed to set only one kind of storage class as default\_class**| --- | --- |
| **glusterfs\_provisioner\_restauthenabled** | **Gluster REST service authentication boolean that enables authentication to the REST server. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_resturl** | **Gluster REST service/Heketi service url which provision gluster volumes on demand. The general format should be IPaddress:Port and this is a mandatory parameter for GlusterFS dynamic provisioner. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_clusterid** | **Optional, for example,630372ccdc720a92c681fb928f27b53f is the ID of the cluster which will be used by Heketi when provisioning the volume. It can also be a list of clusterids. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_restuser** | **Gluster REST service/Heketi user who has access to create volumes in the Gluster Trusted Pool. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_secretName** | **Optional, identification of Secret instance that contains user password to use when talking to Gluster REST service,Installation package will automatically create this secret in Kube-system，Refer to[Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_gidMin** | **The minimum value of GID range for the storage class. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_gidMax** |**The maximum value of GID range for the storage class. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **glusterfs\_provisioner\_volumetype** | **The volume type and its parameters can be configured with this optional value,For example: ‘Replica volume’: volumetype: replicate:3. Refer to [Kubernetes Docs](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs)** |
| **jwt\_admin\_key** | **"jwt.admin.key" column from "/etc/heketi/heketi.json" in Heketi server** |

**Attention：**<br/>
 > In Glusterfs, `"glusterfs_provisioner_clusterid"` could be returned from glusterfs server. Execute following command:
 
 ```
 $ export HEKETI_CLI_SERVER=http://localhost:8080
 
 $ heketi-cli cluster list
 
 ```
 

#### How to use local volume(It does not belong to Kubesphere Installation)

This section does not belong to Kubesphere Installation, we just plan to guide users how to use local volume.

> local volume is only applicapable for `All-in-one` mode.


Following steps describes how to use `local volume`：

1.Create folder in host first

2.Create Persistent Volume

3.Create Volume in KubeSphere


- Log in to host and create folder first，take an example as following section.Execute following command：

```
mkdir -p /mnt/disks/vol-test
```

- Create Persistent Volume

  - pv.yaml file specification

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-local
spec:
  capacity:
    storage: 10Gi 
  # volumeMode field requires BlockVolume Alpha feature gate to be enabled.
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local
  local:
    path: /mnt/disks/vol-test
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - kubesphere
```

- Execute creation command:

```
$ kubectl create -f pv-local.yaml
```

- Execute following command to test creation result:

```
$ kubectl get pv
NAME         CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM        STORAGECLASS    REASON    AGE
pv-local     10Gi       RWO            Delete           Available                local                     4s
```

  - Then you may need to create local volume in KubeSphere UI：

**Note：** <br/>
>  It is normal when the status is "Pending" after Local volume successfully created, the volume status will change to "Bound" until workload being created after pod scheduling.

- Following section describes how to clean up volume:

  1. Delete the unmounted volumes in Kubesphere UI

  2. Log in to host and delete persistent volumes

  3. Remove the folders related to persistent volumes for data clean-up.

> Local volumes do not support dynamic provisioning yet, if you would like to experience dynamic provisioning recommended by KubeSphere, please configure the storage server for GlusterFS or Ceph RBD.
**** 

### **SSH Password-less Login Configuration Instructions**


Execute following commands orderly，go into  **`scripts`** ，then execute **`sendsshkey.py`** :
 
```
$ cd scripts
```  

```
$ ./sendsshkey.py
```
If returns  **"`id\_rsa.pub Does not exist!`"**  ,  please generate SSH key firstly ，then execute `sendsshkey.py` again.

**Generate SSH key ：**

```
$ ssh-keygen -t rsa -N ''
```
