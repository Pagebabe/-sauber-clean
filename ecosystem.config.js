/**
 * PM2 Ecosystem Configuration
 * Production deployment configuration for PW Pattaya Real Estate
 */

module.exports = {
  apps: [
    {
      name: 'pw-pattaya',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/pw-pattaya',
      instances: 2, // Use 2 instances for load balancing (or 'max' for all CPU cores)
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
      max_memory_restart: '500M', // Restart if memory exceeds 500MB
      autorestart: true,
      watch: false, // Don't watch files in production
      max_restarts: 10, // Max 10 restarts within min_uptime
      min_uptime: '10s', // Minimum uptime before restart
    },
  ],
};
