
## Storage Configuration Instructions

### Storage classes configuration

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
 

### How to use local volume(It does not belong to Kubesphere Installation)

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
