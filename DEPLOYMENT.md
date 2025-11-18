# 🚀 Deployment Guide

**PW Pattaya Real Estate - Clean Rebuild**

This guide covers deploying the Next.js application to a VPS server.

---

## 📋 Prerequisites

- VPS Server (Ubuntu 20.04+ recommended)
- Node.js 18+ installed
- PostgreSQL 16 installed
- Nginx installed
- PM2 installed globally
- SSL certificate (Let's Encrypt)

---

## 🔧 Server Setup

### 1. Install Node.js & NPM
```bash
# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v18.x.x
npm --version
```

### 2. Install PostgreSQL
```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE pw_pattaya;
CREATE USER pw_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pw_pattaya TO pw_user;
\q
```

### 3. Install PM2
```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
```

### 4. Install Nginx
```bash
# Install Nginx
sudo apt-get install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 📦 Application Deployment

### 1. Clone Repository
```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/Pagebabe/-sauber-clean.git pw-pattaya-clean
cd pw-pattaya-clean
```

### 2. Configure Environment
```bash
# Create .env file
cat > .env << EOF
# Database
DATABASE_URL="postgresql://pw_user:your_password@localhost:5432/pw_pattaya?schema=public"

# App
NEXT_PUBLIC_APP_URL="https://pw-pattaya-real-estate.com"
NODE_ENV="production"

# Auth (if using NextAuth)
NEXTAUTH_URL="https://pw-pattaya-real-estate.com"
NEXTAUTH_SECRET="generate-a-random-secret-here"
EOF

# Set proper permissions
chmod 600 .env
```

### 3. Install Dependencies
```bash
# Install Node.js dependencies
npm install --production

# Generate Prisma Client
npx prisma generate
```

### 4. Setup Database
```bash
# Push Prisma schema to database
npx prisma db push

# Seed database (if seed script exists)
npm run seed
```

### 5. Build Application
```bash
# Build Next.js app
npm run build

# Verify build
ls -la .next
```

### 6. Start with PM2
```bash
# Start application with PM2
pm2 start npm --name "pw-pattaya" -- start

# Save PM2 process list
pm2 save

# Check status
pm2 status
pm2 logs pw-pattaya
```

---

## ⚙️ Nginx Configuration

### 1. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/pw-pattaya
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name pw-pattaya-real-estate.com www.pw-pattaya-real-estate.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pw-pattaya-real-estate.com www.pw-pattaya-real-estate.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/pw-pattaya-real-estate.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pw-pattaya-real-estate.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images caching
    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logs
    access_log /var/log/nginx/pw-pattaya-access.log;
    error_log /var/log/nginx/pw-pattaya-error.log;
}
```

### 2. Enable Site
```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/pw-pattaya /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

### 1. Install Certbot
```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx
```

### 2. Obtain Certificate
```bash
# Get SSL certificate
sudo certbot --nginx -d pw-pattaya-real-estate.com -d www.pw-pattaya-real-estate.com

# Follow the prompts
# Email: your-email@example.com
# Agree to terms: Yes
# Redirect HTTP to HTTPS: Yes
```

### 3. Auto-Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot will auto-renew (cron job is added automatically)
```

---

## 🔄 Updates & Maintenance

### Deploying Updates
```bash
# Navigate to app directory
cd /var/www/pw-pattaya-clean

# Pull latest code
git pull origin main

# Install any new dependencies
npm install --production

# Rebuild application
npm run build

# Restart PM2 process
pm2 restart pw-pattaya

# Check logs
pm2 logs pw-pattaya
```

### Database Migrations
```bash
# Navigate to app directory
cd /var/www/pw-pattaya-clean

# Pull latest code
git pull origin main

# Apply Prisma migrations
npx prisma migrate deploy

# Restart application
pm2 restart pw-pattaya
```

### Monitoring
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs pw-pattaya

# Monitor resources
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/pw-pattaya-access.log
sudo tail -f /var/log/nginx/pw-pattaya-error.log
```

---

## 🛠️ Troubleshooting

### App Won't Start
```bash
# Check PM2 logs
pm2 logs pw-pattaya

# Check environment variables
cat .env

# Verify database connection
psql -U pw_user -d pw_pattaya -h localhost

# Rebuild application
npm run build
pm2 restart pw-pattaya
```

### Nginx Errors
```bash
# Check Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/pw-pattaya-error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Database Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database connection
sudo -u postgres psql
\l  # List databases
\c pw_pattaya  # Connect to database
\dt  # List tables

# Reset Prisma schema (WARNING: Deletes data)
npx prisma db push --force-reset
```

---

## 📊 Performance Optimization

### 1. PM2 Cluster Mode
```bash
# Stop current instance
pm2 delete pw-pattaya

# Start in cluster mode (uses all CPU cores)
pm2 start npm --name "pw-pattaya" -i max -- start

# Save configuration
pm2 save
```

### 2. Nginx Caching
Add to Nginx config:
```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC:10m inactive=7d use_temp_path=off;

location /_next/static {
    proxy_cache STATIC;
    proxy_pass http://localhost:3000;
}
```

### 3. PostgreSQL Tuning
```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/16/main/postgresql.conf

# Recommended settings for production
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 4MB
min_wal_size = 1GB
max_wal_size = 4GB

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 🔐 Security Checklist

- [x] Firewall configured (allow 22, 80, 443)
- [x] SSL certificate installed
- [x] Database password is strong
- [x] .env file permissions set to 600
- [x] Nginx security headers configured
- [x] Regular security updates scheduled
- [x] SSH key authentication only
- [x] Fail2ban installed (optional but recommended)

---

## 📝 Backup Strategy

### Database Backup
```bash
# Create backup script
cat > /var/www/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/pw-pattaya"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -U pw_user pw_pattaya | gzip > $BACKUP_DIR/db-$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "db-*.sql.gz" -mtime +7 -delete
EOF

chmod +x /var/www/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /var/www/backup-db.sh
```

### Files Backup
```bash
# Backup uploads directory (if applicable)
tar -czf /var/backups/pw-pattaya/uploads-$(date +%Y%m%d).tar.gz /var/www/pw-pattaya-clean/public/uploads
```

---

## ✅ Post-Deployment Checklist

- [ ] Application accessible via HTTPS
- [ ] SSL certificate valid
- [ ] Database connected
- [ ] All pages loading correctly
- [ ] Contact forms working
- [ ] Property images loading
- [ ] PM2 process running
- [ ] Nginx configured correctly
- [ ] Logs are clean (no errors)
- [ ] Performance tested (Lighthouse > 95)
- [ ] Mobile responsive
- [ ] All languages working (if i18n enabled)

---

## 📞 Support

For deployment issues, check:
- PM2 logs: `pm2 logs pw-pattaya`
- Nginx logs: `/var/log/nginx/pw-pattaya-error.log`
- Application logs: Check PM2 logs
- Database logs: `/var/log/postgresql/postgresql-16-main.log`

---

**Deployment completed successfully!** 🎉

Your PW Pattaya Real Estate website is now live and production-ready.
