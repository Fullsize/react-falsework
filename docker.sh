DOCKER_BUILDKIT=1 docker build . -t react_dist  --progress=plain
docker stop react_dist｜true
docker rm react_dist｜true
docker run -it -d -p 8093:80 --name react_dist  react_dist