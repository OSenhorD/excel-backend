export default {
  token_secret: process.env.TOKEN_SECRET,
  token_expires: process.env.TOKEN_EXPIRES,
  token_refresh_secret: process.env.TOKEN_REFRESH_SECRET,
  token_refresh_expires_in: process.env.TOKEN_REFRESH_EXPIRES_IN,
  token_refresh_expires_days: Number(process.env.TOKEN_REFRESH_EXPIRES_DAYS),
  token_recovery_secret: process.env.TOKEN_RECOVERY_SECRET,
  token_recovery_expires_in: process.env.TOKEN_RECOVERY_EXPIRES_IN,
  token_recovery_expires_hours: Number(process.env.TOKEN_RECOVERY_EXPIRES_HOURS),
}
