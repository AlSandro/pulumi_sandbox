"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");
const eks = require("@pulumi/eks");

// var bucket_names = ["my-bucket-askdasdkjsa", "my-other-bucket-asbasd", "my-third-bucket-abjashjd"]

// var bucket_ids = []
// // Create an AWS resource (S3 Bucket)
// bucket_names.forEach(bucket_name => {
//     const bucket = new aws.s3.Bucket(bucket_name);
//     bucket_ids.push(bucket.id);
// });
// exports.bucket_ids = bucket_ids

const vpc = new awsx.ec2.Vpc("eks-vpc", {
    cidrBlock: "10.0.0.0/16",
    // numberOfAvailabilityZones: 3,
});
const newCluster = new eks.Cluster("my-cluster", {
    vpcId: vpc.id,
    instanceType: "t2.micro",
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 2,
});

exports.kubeconfig = newCluster.kubeconfig;