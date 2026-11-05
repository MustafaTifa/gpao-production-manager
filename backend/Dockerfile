# Use a lightweight OpenJDK image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/somatel-liebherr.jar app.jar

# Expose the same port as in your Spring Boot config (change if needed)
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]