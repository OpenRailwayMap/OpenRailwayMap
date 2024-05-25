# Stage 1: PostGIS Setup Stage
FROM ubuntu:rolling as postgis-setup

# Set environment variables to avoid interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install PostgreSQL and PostGIS dependencies
RUN apt-get update && \
    apt-get install -y \
    postgresql \
    postgis \
    wget \
    tar \
    gzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy custom pg_hba.conf into the container
COPY config/postgresql/pg_hba.conf /var/lib/postgresql/pg_hba.conf

# Set up PostgreSQL and PostGIS
USER postgres
RUN /etc/init.d/postgresql start && \
    createuser osmimport && \
    createuser openrailwaymap && \
    createdb -E UTF8 -O osmimport openrailwaymap && \
    psql -d openrailwaymap -c "CREATE EXTENSION postgis;" && \
    psql -d openrailwaymap -c "CREATE EXTENSION unaccent;" && \
    psql -d openrailwaymap -c "CREATE EXTENSION hstore;"

# Stage 2: Build Stage
FROM ubuntu:rolling as builder

# Set environment variables to avoid interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install build dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    g++ \
    make \
    cmake \
    wget \
    git \
    zlib1g-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Clone the OpenRailwayMap repository
WORKDIR /var/www/html
RUN git clone https://github.com/openrailwaymap/OpenRailwayMap.git

# Install Leaflet and the Leaflet extension that provides the edit link
WORKDIR /var/www/html/OpenRailwayMap
RUN make install-deps

# Stage 3: Final Stage
FROM ubuntu:rolling as runtime

# Set environment variables to avoid interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && \
    apt-get install -y \
    osm2pgsql \
    nodejs \
    npm \
    bc \
    apache2 \
    libapache2-mod-php \
    php-php-gettext \
    php-pgsql \
    python3-pip \
    python3-pil \
    python3-cairo \
    python3-ply \
    apache2-dev \
    zlib1g-dev \
    build-essential \
    g++ \
    make && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set up Apache modules
RUN a2enmod rewrite && \
    a2enmod proxy && \
    a2enmod proxy_http && \
    a2enmod headers

# Copy Apache virtual host configuration files
COPY config/apache/www.openrailwaymap.test.conf /etc/apache2/sites-available/www.openrailwaymap.test.conf
COPY config/apache/api.openrailwaymap.test.conf /etc/apache2/sites-available/api.openrailwaymap.test.conf
COPY config/apache/tiles.openrailwaymap.test.conf /etc/apache2/sites-available/tiles.openrailwaymap.test.conf

# Enable virtual hosts
RUN a2ensite www.openrailwaymap.test.conf && \
    a2ensite api.openrailwaymap.test.conf && \
    a2ensite tiles.openrailwaymap.test.conf

# Set ServerName globally to suppress Apache warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Set up Apache log files
RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log && \
    ln -sf /proc/self/fd/1 /var/log/apache2/error.log

# Set working directory for OpenRailwayMap
WORKDIR /var/www/html/OpenRailwayMap

# Copy necessary files from builder stage
COPY --from=builder /var/www/html/OpenRailwayMap /var/www/html/OpenRailwayMap

# Copy PostgreSQL data from postgis-setup stage
COPY --from=postgis-setup /var/lib/postgresql /var/lib/postgresql
COPY --from=postgis-setup /var/run/postgresql /var/run/postgresql
COPY --from=postgis-setup /etc/postgresql /etc/postgresql

# Expose Apache and PostgreSQL ports
EXPOSE 8080 5432

# Start PostgreSQL and Apache
CMD service postgresql start && apachectl -D FOREGROUND
