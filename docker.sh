docker stop react_dist
docker rm react_dist
docker rmi react_dist
docker build . -t react_dist
