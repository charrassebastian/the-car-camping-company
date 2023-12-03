# The Car Camping Company's Management System

Management System for an hypothetical car camping company. To run it, run the build script, build the Docker image and apply the kubernetes manifests for the server and the database. Use

kubectl port-forward svc/cccms-server <port>:80 &

to forward the port and make it accessible.
