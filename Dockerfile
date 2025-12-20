FROM ubuntu:latest AS base
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y curl

FROM base AS openjdk
RUN apt-get install -y openjdk-25-jdk
RUN find /usr/lib/jvm -name "java-25-openjdk-*" | xargs -I {} mv {} /usr/lib/jvm/java-25-openjdk
ENV JAVA_HOME=/usr/lib/jvm/java-25-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH

FROM base AS node
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
RUN apt-get install -y nodejs

FROM openjdk AS maven
RUN apt-get install -y maven

FROM maven AS notebook-api-env
COPY /notebook-api/pom.xml /usr/home/notebook-api/pom.xml
COPY /notebook-api/src /usr/home/notebook-api/src
WORKDIR /usr/home/notebook-api
RUN mvn clean package

FROM node AS notebook-ui-env
COPY /notebook-ui/package.json /usr/home/notebook-ui/package.json
COPY /notebook-ui/package-lock.json /usr/home/notebook-ui/package-lock.json
WORKDIR /usr/home/notebook-ui
RUN npm install