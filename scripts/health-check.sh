#!/bin/bash

###############################################################################
# PW Pattaya Real Estate - Production Health Check Script
# Checks all critical services and endpoints
###############################################################################

echo "🔍 PW Pattaya Production Health Check"
echo "======================================="

# Initialize status flag
ALL_OK=true

# Check Nginx
echo ""
echo "📡 Nginx Status:"
if systemctl is-active --quiet nginx; then
    echo "✅ Running"
else
    echo "❌ Down"
    ALL_OK=false
fi

# Check PM2
echo ""
echo "⚙️  PM2 Status:"
if pm2 describe pw-pattaya > /dev/null 2>&1; then
    echo "✅ Running"
    # Check number of instances
    INSTANCES=$(pm2 jlist | grep -o '"name":"pw-pattaya"' | wc -l)
    echo "   Instances: $INSTANCES"
else
    echo "❌ Down"
    ALL_OK=false
fi

# Check PostgreSQL
echo ""
echo "🗄️  PostgreSQL Status:"
if systemctl is-active --quiet postgresql; then
    echo "✅ Running"
else
    echo "❌ Down"
    ALL_OK=false
fi

# Check Website Response
echo ""
echo "🌐 Website Health:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://pw-pattaya.com)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ HTTPS returns 200 OK"
else
    echo "❌ HTTPS returns $HTTP_CODE"
    ALL_OK=false
fi

# Check HTTP to HTTPS redirect
HTTP_REDIRECT=$(curl -s -o /dev/null -w "%{http_code}" http://pw-pattaya.com)
if [ "$HTTP_REDIRECT" -eq 301 ] || [ "$HTTP_REDIRECT" -eq 302 ]; then
    echo "✅ HTTP redirect working (returns $HTTP_REDIRECT)"
else
    echo "⚠️  HTTP redirect not working (returns $HTTP_REDIRECT)"
fi

# Check API Endpoint
echo ""
echo "🔌 API Health:"
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://pw-pattaya.com/api/properties)
if [ "$API_CODE" -eq 200 ]; then
    echo "✅ API returns 200 OK"
else
    echo "❌ API returns $API_CODE"
    ALL_OK=false
fi

# Check SSL Certificate
echo ""
echo "🔒 SSL Certificate:"
if command -v openssl &> /dev/null; then
    CERT_EXPIRY=$(echo | openssl s_client -servername pw-pattaya.com -connect pw-pattaya.com:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep notAfter | cut -d= -f2)
    if [ -n "$CERT_EXPIRY" ]; then
        echo "✅ Valid until: $CERT_EXPIRY"
    else
        echo "⚠️  Unable to check expiry"
    fi
else
    echo "⚠️  OpenSSL not available"
fi

# Check Disk Space
echo ""
echo "💾 Disk Space:"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo "✅ Disk usage: ${DISK_USAGE}%"
else
    echo "⚠️  Disk usage high: ${DISK_USAGE}%"
fi

# Check Memory
echo ""
echo "🧠 Memory Usage:"
MEM_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100.0)}')
if [ "$MEM_USAGE" -lt 90 ]; then
    echo "✅ Memory usage: ${MEM_USAGE}%"
else
    echo "⚠️  Memory usage high: ${MEM_USAGE}%"
fi

# Summary
echo ""
echo "======================================="
if [ "$ALL_OK" = true ]; then
    echo "✅ All critical services are healthy!"
    exit 0
else
    echo "❌ Some services need attention!"
    exit 1
fi
