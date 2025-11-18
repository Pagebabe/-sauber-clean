# 🚀 PW Pattaya Real Estate - Production Deployment Guide

**Server**: root@46.62.169.109
**Domain**: pw-pattaya.com
**Tech Stack**: Next.js 15 + PostgreSQL 14 + Nginx + PM2 + Let's Encrypt SSL

This comprehensive guide covers deploying the Next.js application to production with complete server configuration, security, monitoring, and maintenance procedures.

---

## 📋 Prerequisites

### Local Requirements
- ✅ All development phases complete (1-7)
- ✅ Production build passing (`npm run build`)
- ✅ All tests passing
- ✅ Environment variables configured

### Server Requirements
- ✅ Ubuntu 20.04+ LTS
- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed
- ✅ Nginx installed
- ✅ PM2 installed globally
- ✅ SSL certificate (Let's Encrypt)
- ✅ Domain DNS pointed to server IP

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

### 2. Install PostgreSQL 14+
```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify version (should be 14+)
psql --version
```

### 2.1 Create Production Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE pw_pattaya_production;
CREATE USER pw_pattaya_user WITH ENCRYPTED PASSWORD 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE pw_pattaya_production TO pw_pattaya_user;

# Exit psql
\q
```

### 2.2 Configure PostgreSQL Security
```bash
# Edit pg_hba.conf for local connections
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Add line for local app access:
# local   pw_pattaya_production   pw_pattaya_user   md5

# Restart PostgreSQL
sudo systemctl restart postgresql
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

# Clone repository (use the correct GitHub repo)
git clone https://github.com/Pagebabe/-sauber-clean.git pw-pattaya
cd pw-pattaya
```

### 2. Configure Environment Variables
```bash
# Create production .env file
nano .env.production
```

**Add the following configuration:**

```env
# Database
DATABASE_URL="postgresql://pw_pattaya_user:YOUR_SECURE_PASSWORD@localhost:5432/pw_pattaya_production?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="https://pw-pattaya.com"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_HERE"

# App Configuration
NEXT_PUBLIC_APP_URL="https://pw-pattaya.com"
NEXT_PUBLIC_SITE_URL="https://pw-pattaya.com"
NODE_ENV="production"

# Admin Credentials (for database seeding)
ADMIN_EMAIL="admin@pw-pattaya.com"
ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD"
```

**Generate Secure Secrets:**

```bash
# Generate NEXTAUTH_SECRET (32-byte random string)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and replace YOUR_NEXTAUTH_SECRET_HERE in .env.production
```

**Set proper permissions:**

```bash
chmod 600 .env.production
```

### 3. Install Dependencies
```bash
# Install Node.js dependencies
npm install --production

# Generate Prisma Client
npx prisma generate
```

### 4. Setup Database with Prisma
```bash
# Run Prisma migrations (production-safe)
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Verify migrations
npx prisma migrate status
```

### 4.1 Seed Initial Admin User
```bash
# Create seed script if not exists
# This should be in prisma/seed.ts (see Database Migration section below)

# Run seed to create admin user
npx prisma db seed
```

### 5. Build Application
```bash
# Build Next.js app
npm run build

# Verify build
ls -la .next
```

### 6. Configure and Start with PM2

**Create PM2 Ecosystem Config:**

```bash
# Create ecosystem.config.js
nano ecosystem.config.js
```

**Add the following configuration:**

```javascript
module.exports = {
  apps: [
    {
      name: 'pw-pattaya',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/pw-pattaya',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '.env.production',
      error_file: '/var/log/pm2/pw-pattaya-error.log',
      out_file: '/var/log/pm2/pw-pattaya-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '500M',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
```

**Start application:**

```bash
# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start with PM2 using ecosystem file
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script (run as root)
pm2 startup systemd
# Follow the command it outputs (usually something like):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your_user --hp /home/your_user

# Check status
pm2 status
pm2 logs pw-pattaya --lines 50
```

---

## ⚙️ Nginx Configuration

### 1. Create Nginx Server Block

```bash
sudo nano /etc/nginx/sites-available/pw-pattaya.com
```

**Add the following configuration:**

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name pw-pattaya.com www.pw-pattaya.com;

    # Certbot ACME challenge
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Redirect all other HTTP requests to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name pw-pattaya.com www.pw-pattaya.com;

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/pw-pattaya.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pw-pattaya.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;

    # Client body size
    client_max_body_size 10M;

    # Proxy to Next.js app
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

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching (Next.js build output)
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Image optimization caching
    location /_next/image {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    # Public static files
    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }

    # Logs
    access_log /var/log/nginx/pw-pattaya.access.log;
    error_log /var/log/nginx/pw-pattaya.error.log;
}
```

### 2. Enable Site and Restart Nginx

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/pw-pattaya.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

### 1. Install Certbot

```bash
# Install Certbot and Nginx plugin
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificate

```bash
# Get SSL certificate for both domains
sudo certbot --nginx -d pw-pattaya.com -d www.pw-pattaya.com

# Follow the prompts:
# 1. Enter email address (for renewal notifications)
# 2. Agree to Terms of Service: Yes (Y)
# 3. Share email with EFF: Optional (your choice)
# 4. Redirect HTTP to HTTPS: Yes (option 2)
```

### 3. Verify SSL Certificate

```bash
# Check certificate status
sudo certbot certificates

# Should show:
# - Certificate Name: pw-pattaya.com
# - Domains: pw-pattaya.com www.pw-pattaya.com
# - Expiry Date: (90 days from now)
# - Certificate Path: /etc/letsencrypt/live/pw-pattaya.com/fullchain.pem
```

### 4. Setup Auto-Renewal

```bash
# Test renewal process (dry run)
sudo certbot renew --dry-run

# Check auto-renewal timer (systemd)
sudo systemctl status certbot.timer

# Certbot automatically sets up renewal cron job
# Manual check: certificates auto-renew before expiry (every 90 days)

# Optional: Add manual cron job for extra safety
sudo crontab -e

# Add line (runs at 3 AM daily):
# 0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

---

## 🔄 Database Migration and Seeding

### Create Seed Script

Create `prisma/seed.ts` for initial admin user:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pw-pattaya.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('🔐 Login with:', adminEmail, '/', adminPassword);
  console.log('⚠️  IMPORTANT: Change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Update package.json:**

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

**Run seed:**

```bash
# Install ts-node and types (if not already)
npm install -D ts-node @types/node

# Run seed script
npx prisma db seed
```

---

## 🔄 Deployment Updates & Maintenance

### Deploying Code Updates

```bash
# SSH into server
ssh root@46.62.169.109

# Navigate to app directory
cd /var/www/pw-pattaya

# Pull latest code
git pull origin main

# Install any new dependencies
npm install --production

# Rebuild application
npm run build

# Restart PM2 process
pm2 restart pw-pattaya

# Check logs for errors
pm2 logs pw-pattaya --lines 50
```

### Deploying Database Migrations

```bash
# SSH into server
ssh root@46.62.169.109

# Navigate to app directory
cd /var/www/pw-pattaya

# Pull latest code
git pull origin main

# Run migrations (production-safe)
npx prisma migrate deploy

# Restart application
pm2 restart pw-pattaya

# Verify migration status
npx prisma migrate status
```

### Rollback Procedure

```bash
# View recent commits
git log --oneline -10

# Rollback to specific commit
git reset --hard COMMIT_HASH

# Rebuild and restart
npm run build
pm2 restart pw-pattaya

# Check application
pm2 logs pw-pattaya --lines 50
```

---

## 📊 Monitoring and Logs

### PM2 Monitoring

```bash
# Check PM2 status
pm2 status

# View real-time logs
pm2 logs pw-pattaya

# View last 100 lines
pm2 logs pw-pattaya --lines 100

# View only errors
pm2 logs pw-pattaya --err

# Real-time resource monitoring
pm2 monit

# Flush logs
pm2 flush
```

### System Logs

```bash
# Nginx access logs (real-time)
sudo tail -f /var/log/nginx/pw-pattaya.access.log

# Nginx error logs (real-time)
sudo tail -f /var/log/nginx/pw-pattaya.error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# System resource usage
htop  # or top
df -h  # disk usage
free -h  # memory usage
```

### Log Rotation Setup

Create `/etc/logrotate.d/pw-pattaya`:

```bash
sudo nano /etc/logrotate.d/pw-pattaya
```

**Add configuration:**

```
/var/log/pm2/pw-pattaya-*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    create 0640 root root
}
```

---

## 🧪 Production Health Checks

### Create Health Check Script

Create `scripts/health-check.sh`:

```bash
#!/bin/bash

echo "🔍 PW Pattaya Production Health Check"
echo "======================================="

# Check Nginx
echo ""
echo "📡 Nginx Status:"
systemctl is-active nginx && echo "✅ Running" || echo "❌ Down"

# Check PM2
echo ""
echo "⚙️  PM2 Status:"
pm2 describe pw-pattaya > /dev/null 2>&1 && echo "✅ Running" || echo "❌ Down"

# Check PostgreSQL
echo ""
echo "🗄️  PostgreSQL Status:"
systemctl is-active postgresql && echo "✅ Running" || echo "❌ Down"

# Check Website Response
echo ""
echo "🌐 Website Health:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://pw-pattaya.com)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ HTTPS returns 200 OK"
else
    echo "❌ HTTPS returns $HTTP_CODE"
fi

# Check API Endpoint
echo ""
echo "🔌 API Health:"
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://pw-pattaya.com/api/properties)
if [ "$API_CODE" -eq 200 ]; then
    echo "✅ API returns 200 OK"
else
    echo "❌ API returns $API_CODE"
fi

echo ""
echo "======================================="
echo "Health check complete!"
```

**Make executable and run:**

```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh
```

### Manual Testing Checklist

- [ ] Homepage loads (https://pw-pattaya.com)
- [ ] Buy page works (/buy)
- [ ] Rent page works (/rent)
- [ ] Property detail pages load
- [ ] Projects page works
- [ ] About/Contact/Services pages load
- [ ] Language switching works (EN, DE, TH, RU, FR)
- [ ] Contact form submits successfully
- [ ] Admin login works (/admin)
- [ ] Admin CRUD operations work
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] SEO meta tags present
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)

---

## 🛠️ Troubleshooting

### 1. Application Won't Start

```bash
# Check PM2 logs for errors
pm2 logs pw-pattaya --err

# Check if port 3000 is already in use
sudo lsof -i :3000

# Verify environment variables
cat .env.production

# Check Prisma Client generated
ls -la node_modules/.prisma/client

# Rebuild and restart
npm run build
pm2 restart pw-pattaya
```

### 2. Database Connection Errors

```bash
# Test database connection
psql -U pw_pattaya_user -d pw_pattaya_production -h localhost

# If connection fails, check PostgreSQL status
sudo systemctl status postgresql

# Check pg_hba.conf permissions
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Verify DATABASE_URL in .env.production
cat .env.production | grep DATABASE_URL

# Test Prisma connection
npx prisma db pull
```

### 3. Nginx 502 Bad Gateway

```bash
# Check if Next.js app is running
pm2 status

# If not running, check PM2 logs
pm2 logs pw-pattaya --lines 50

# Check Nginx error logs
sudo tail -f /var/log/nginx/pw-pattaya.error.log

# Test Nginx configuration
sudo nginx -t

# Restart both services
pm2 restart pw-pattaya
sudo systemctl restart nginx
```

### 4. SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run

# If expired, renew manually
sudo certbot renew --force-renewal

# Restart Nginx after renewal
sudo systemctl reload nginx
```

### 5. Build Failures

```bash
# Clear build cache
rm -rf .next node_modules

# Reinstall dependencies
npm install

# Regenerate Prisma Client
npx prisma generate

# Rebuild
npm run build

# If still fails, check Node.js version
node --version  # Should be 18+
```

### 6. Memory/Performance Issues

```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 list

# Restart PM2 to clear memory
pm2 restart pw-pattaya

# If persistent, increase max_memory_restart in ecosystem.config.js
# Change: max_memory_restart: '1G'

# Restart with new config
pm2 delete pw-pattaya
pm2 start ecosystem.config.js
```

### 7. Database Tables Missing

```bash
# Check migration status
npx prisma migrate status

# If migrations not applied
npx prisma migrate deploy

# If migration failed, reset (WARNING: Data loss!)
npx prisma migrate reset --skip-seed

# Reseed database
npx prisma db seed
```

---

## 📊 Performance Optimization

### 1. Database Indexing

Already configured in Prisma schema, but you can add custom indexes:

```sql
-- Connect to database
psql -U pw_pattaya_user -d pw_pattaya_production

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_property_listing_type ON "Property"("listingType");
CREATE INDEX IF NOT EXISTS idx_property_property_type ON "Property"("propertyType");
CREATE INDEX IF NOT EXISTS idx_property_price ON "Property"("price");
CREATE INDEX IF NOT EXISTS idx_property_bedrooms ON "Property"("bedrooms");
CREATE INDEX IF NOT EXISTS idx_lead_status ON "Lead"("status");
CREATE INDEX IF NOT EXISTS idx_lead_created_at ON "Lead"("createdAt");
```

### 2. PM2 Cluster Mode

Already configured in `ecosystem.config.js` with 2 instances. To use all CPU cores:

```javascript
// In ecosystem.config.js, change:
instances: 'max',  // Instead of 2

// Then restart:
pm2 delete pw-pattaya
pm2 start ecosystem.config.js
pm2 save
```

### 3. PostgreSQL Tuning

```bash
# Edit PostgreSQL config
sudo nano /etc/postgresql/14/main/postgresql.conf

# Recommended settings for production (2GB RAM server)
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

### 4. Next.js Performance

Already configured in `next.config.ts`:
- ✅ Image optimization (AVIF/WebP)
- ✅ Gzip compression
- ✅ SWC minification
- ✅ Security headers

### 5. Nginx Caching

Already configured in nginx config with:
- Static files: 365 days cache
- Images: 7 days cache
- Gzip compression enabled

---

## 📝 Backup Strategy

### Database Backup Script

Create `/var/www/pw-pattaya/scripts/backup-db.sh`:

```bash
#!/bin/bash

# Database backup script
BACKUP_DIR="/var/backups/pw-pattaya"
DATE=$(date +"%Y%m%d_%H%M%S")

# Create backup directory
mkdir -p $BACKUP_DIR

# PostgreSQL backup
echo "🔄 Starting database backup..."
pg_dump -U pw_pattaya_user -d pw_pattaya_production | gzip > $BACKUP_DIR/db-$DATE.sql.gz

# Check if backup successful
if [ $? -eq 0 ]; then
    echo "✅ Backup completed: db-$DATE.sql.gz"
else
    echo "❌ Backup failed!"
    exit 1
fi

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db-*.sql.gz" -mtime +7 -delete

echo "🧹 Old backups cleaned up (keeping last 7 days)"
echo "📦 Backup location: $BACKUP_DIR/db-$DATE.sql.gz"
```

**Make executable:**

```bash
chmod +x /var/www/pw-pattaya/scripts/backup-db.sh
```

**Test backup:**

```bash
/var/www/pw-pattaya/scripts/backup-db.sh
```

### Setup Automated Daily Backups

```bash
# Add to crontab (as root or with sudo)
sudo crontab -e

# Add line for daily backup at 2 AM
0 2 * * * /var/www/pw-pattaya/scripts/backup-db.sh >> /var/log/db-backup.log 2>&1
```

### Restore from Backup

```bash
# List available backups
ls -lh /var/backups/pw-pattaya/

# Restore from backup (replace YYYYMMDD_HHMMSS with actual backup date)
gunzip -c /var/backups/pw-pattaya/db-YYYYMMDD_HHMMSS.sql.gz | psql -U pw_pattaya_user -d pw_pattaya_production

# Restart application
pm2 restart pw-pattaya
```

### File Backup (Code)

```bash
# Backup is on GitHub, but for extra safety:
tar -czf /var/backups/pw-pattaya/code-$(date +%Y%m%d).tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  /var/www/pw-pattaya
```

---

## 🔐 Security Checklist

### Essential Security

- [ ] **Firewall configured** - Allow only 22 (SSH), 80 (HTTP), 443 (HTTPS)
- [ ] **SSL certificate installed** - Let's Encrypt with auto-renewal
- [ ] **Strong database password** - Use password manager
- [ ] **.env.production permissions** - Set to 600 (chmod 600 .env.production)
- [ ] **Nginx security headers** - Already configured
- [ ] **SSH key authentication** - Disable password login
- [ ] **Fail2ban installed** - Protect against brute force (optional)

### Configure Firewall (UFW)

```bash
# Install UFW
sudo apt-get install ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### Disable PostgreSQL Remote Access

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Ensure this line:
listen_addresses = 'localhost'

# Edit pg_hba.conf - remove any remote access lines
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Only local connections allowed
# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Install Fail2ban (Optional)

```bash
# Install Fail2ban
sudo apt-get install fail2ban

# Start and enable
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

---

## ✅ Post-Deployment Checklist

### Infrastructure
- [ ] Node.js 18+ installed
- [ ] PostgreSQL 14+ running
- [ ] Nginx running and configured
- [ ] PM2 running with ecosystem config
- [ ] SSL certificate valid (Let's Encrypt)
- [ ] DNS pointing to server (pw-pattaya.com)
- [ ] Firewall configured (UFW)

### Application
- [ ] Repository cloned to /var/www/pw-pattaya
- [ ] Dependencies installed (npm install)
- [ ] Environment variables set (.env.production)
- [ ] Database migrations applied (prisma migrate deploy)
- [ ] Admin user seeded (prisma db seed)
- [ ] Application built (npm run build)
- [ ] PM2 process running (pm2 status)

### Web Server
- [ ] Nginx server block created
- [ ] HTTPS redirect working (http → https)
- [ ] SSL certificate installed
- [ ] Gzip compression enabled
- [ ] Static file caching configured
- [ ] Security headers present

### Verification
- [ ] Homepage loads: https://pw-pattaya.com ✅
- [ ] All pages accessible (Buy, Rent, Projects, etc.)
- [ ] API endpoints working (/api/properties)
- [ ] Admin login works (/admin)
- [ ] Admin CRUD operations functional
- [ ] Language switching works (5 languages)
- [ ] Contact form submits successfully
- [ ] Images loading correctly
- [ ] Mobile responsive design
- [ ] SEO meta tags present
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)

### Performance
- [ ] Lighthouse score > 90 (Performance)
- [ ] PM2 cluster mode enabled (2+ instances)
- [ ] Database indexes created
- [ ] Image optimization working (AVIF/WebP)
- [ ] Gzip compression active

### Security
- [ ] Firewall enabled (ports 22, 80, 443)
- [ ] PostgreSQL local-only access
- [ ] Strong database password
- [ ] .env.production permissions 600
- [ ] Nginx security headers enabled
- [ ] SSL certificate auto-renewal working

### Monitoring & Backup
- [ ] PM2 logs accessible
- [ ] Nginx logs configured
- [ ] Database backup script created
- [ ] Cron job for daily backups set
- [ ] Health check script working
- [ ] Log rotation configured

---

## 📞 Quick Commands Reference

```bash
# Check all services status
sudo systemctl status nginx postgresql
pm2 status

# View logs
pm2 logs pw-pattaya --lines 50
sudo tail -f /var/log/nginx/pw-pattaya.error.log

# Restart services
pm2 restart pw-pattaya
sudo systemctl restart nginx

# Run health check
./scripts/health-check.sh

# Database backup
./scripts/backup-db.sh

# Deploy updates
cd /var/www/pw-pattaya
git pull origin main
npm install --production
npm run build
pm2 restart pw-pattaya
```

---

## 📚 Support and Resources

### For Deployment Issues

1. **Check PM2 logs**: `pm2 logs pw-pattaya`
2. **Check Nginx logs**: `/var/log/nginx/pw-pattaya.error.log`
3. **Check PostgreSQL logs**: `/var/log/postgresql/postgresql-14-main.log`
4. **Run health check**: `./scripts/health-check.sh`

### Documentation

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- PM2 Docs: https://pm2.keymetrics.io/docs
- Nginx Docs: https://nginx.org/en/docs
- Let's Encrypt: https://letsencrypt.org/docs

### Repository

- GitHub: https://github.com/Pagebabe/-sauber-clean
- Issues: Report bugs via GitHub Issues

---

## 🎉 Deployment Complete!

**Your PW Pattaya Real Estate website is now live and production-ready!**

**Website**: https://pw-pattaya.com
**Admin Panel**: https://pw-pattaya.com/admin
**API**: https://pw-pattaya.com/api/properties

### Next Steps

1. **Test all functionality** - Go through the post-deployment checklist
2. **Monitor logs** - Check PM2 and Nginx logs for any errors
3. **Run Lighthouse test** - Verify performance scores
4. **Setup monitoring** - Consider tools like UptimeRobot or Pingdom
5. **Document credentials** - Store admin password securely

---

**Last Updated**: 2025-11-18
**Version**: 1.0.0
**Server**: root@46.62.169.109
**Domain**: pw-pattaya.com
**Status**: 🚀 Ready for Production Deployment
