import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendConfirmationEmail(email, nom, inscriptionId) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email non configuré - simulation:', { email, nom, inscriptionId });
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #be123c, #d97706); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">ECOB - École de Business Bilingue</h1>
      </div>
      <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
        <h2 style="color: #1e293b;">Confirmation d'inscription</h2>
        <p>Bonjour <strong>${nom}</strong>,</p>
        <p>Nous avons bien reçu votre demande d'inscription (référence: <strong>${inscriptionId}</strong>).</p>
        <p>Notre équipe administrative vous contactera sous <strong>24h</strong> aux coordonnées fournies pour finaliser votre dossier.</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #be123c;">
          <p style="margin: 0;"><strong>Rappel :</strong> Un ordinateur portable vous est offert en cas de règlement intégral de la scolarité à l'inscription ou sous 15 jours.</p>
        </div>
        <p>Cordialement,<br>L'équipe ECOB - Université Bilingue</p>
        <hr style="margin: 20px 0; border-color: #e2e8f0;">
        <p style="font-size: 12px; color: #64748b;">
          ECOB - Sotuba ACI, Bamako, Mali<br>
          Tél: +223 77 66 66 37 / +223 75 75 22 48<br>
          <a href="https://web.facebook.com/Ecob.Mali" style="color: #be123c;">Facebook</a>
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"ECOB Université" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Confirmation d'inscription ECOB - ${inscriptionId}`,
    html
  });
}

export async function sendAdminNotification(inscription) {
  if (!process.env.ADMIN_EMAIL || !process.env.SMTP_USER) return;

  const html = `
    <h2>Nouvelle inscription ECOB</h2>
    <p><strong>ID:</strong> ${inscription.id}</p>
    <p><strong>Nom:</strong> ${inscription.nom_complet}</p>
    <p><strong>Email:</strong> ${inscription.email}</p>
    <p><strong>Téléphone:</strong> ${inscription.telephone}</p>
    <p><strong>Niveau:</strong> ${inscription.niveau}</p>
    <p><strong>Filière:</strong> ${inscription.filiere}</p>
    <p><strong>Paiement:</strong> ${inscription.mode_paiement}</p>
  `;

  await transporter.sendMail({
    from: `"ECOB Système" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nouvelle inscription: ${inscription.nom_complet} (${inscription.id})`,
    html
  });
}