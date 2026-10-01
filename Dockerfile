FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Native deps for IronPdf's bundled Chrome renderer (linux_x64) plus basic fonts
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libc6-dev libgtk2.0-0 libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 \
       libdrm-common libgbm1 libasound2 libxrender1 libfontconfig1 libxshmfence1 \
       fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

ENTRYPOINT ["/app/docker-entrypoint.sh"]
