#!/bin/bash

###############################################################################
# PW Pattaya Real Estate - Database Backup Script
# Creates compressed PostgreSQL backup and manages retention
###############################################################################

# Configuration
BACKUP_DIR="/var/backups/pw-pattaya"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_NAME="pw_pattaya_production"
DB_USER="pw_pattaya_user"
RETENTION_DAYS=7

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔄 PW Pattaya Database Backup"
echo "======================================="
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo "Backup Directory: $BACKUP_DIR"
echo ""

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📁 Creating backup directory..."
    mkdir -p "$BACKUP_DIR"
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to create backup directory!${NC}"
        exit 1
    fi
fi

# Start backup
echo "🔄 Starting database backup..."
BACKUP_FILE="$BACKUP_DIR/db-$DATE.sql.gz"

# Perform backup with compression
pg_dump -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_FILE"

# Check if backup was successful
if [ $? -eq 0 ] && [ -f "$BACKUP_FILE" ]; then
    # Get file size
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup completed successfully!${NC}"
    echo "📦 File: $BACKUP_FILE"
    echo "📏 Size: $FILE_SIZE"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi

# Clean up old backups
echo ""
echo "🧹 Cleaning up old backups (keeping last $RETENTION_DAYS days)..."
DELETED_COUNT=$(find "$BACKUP_DIR" -name "db-*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete -print | wc -l)

if [ "$DELETED_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}🗑️  Deleted $DELETED_COUNT old backup(s)${NC}"
else
    echo "✅ No old backups to delete"
fi

# List current backups
echo ""
echo "📋 Current backups:"
ls -lh "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'

# Count total backups
TOTAL_BACKUPS=$(ls -1 "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | wc -l)
echo ""
echo "======================================="
echo -e "${GREEN}✅ Backup process complete!${NC}"
echo "📊 Total backups: $TOTAL_BACKUPS"
echo "💾 Latest backup: $BACKUP_FILE"

exit 0
