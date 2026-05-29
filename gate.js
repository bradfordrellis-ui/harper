// ============================================
// HARPER — Member Gate
// Include this script on any protected page:
// <script src="gate.js"></script>
// ============================================

(async function() {
  const SUPABASE_URL = 'https://qooofbxwhjmeoyhsihki.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_7J8djU8_1ORfR2e_CFTO3g_ED2OaUPU';

  // Inject the gate overlay immediately so nothing shows while we check
  const overlay = document.createElement('div');
  overlay.id = 'harper-gate';
  overlay.style.cssText = `
    position: fixed; inset: 0; background: #F1EFE8;
    display: flex; align-items: center; justify-content: center;
    z-index: 9999; font-family: 'Jost', sans-serif;
  `;
  overlay.innerHTML = `
    <div style="text-align:center;">
      <div style="font-family:'Cormorant Garamond',serif; font-size:1.4rem; letter-spacing:0.18em; color:#1a1a18; margin-bottom:1.5rem;">
        H<span style="color:#A09070;">A</span>RPER
      </div>
      <div style="font-size:0.78rem; color:#888780;" id="gate-msg">Verifying membership…</div>
    </div>
  `;
  document.body.appendChild(overlay);

  function showGateMessage(title, sub, showLogin, showHome) {
    overlay.innerHTML = `
      <div style="text-align:center; max-width:400px; padding:2rem;">
        <a href="index.html" style="font-family:'Cormorant Garamond',serif; font-size:1.4rem; letter-spacing:0.18em; color:#1a1a18; text-decoration:none; display:block; margin-bottom:2rem;">
          H<span style="color:#A09070;">A</span>RPER
        </a>
        <div style="background:#fff; border:0.5px solid #e8ddd0; border-radius:14px; padding:2.25rem 2.5rem;">
          <div style="font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:400; color:#1a1a18; margin-bottom:8px;">${title}</div>
          <div style="font-size:0.82rem; color:#888780; line-height:1.75; margin-bottom:1.5rem;">${sub}</div>
          ${showLogin ? `<a href="login.html" style="display:block; padding:12px; background:#A09070; color:#fff; border-radius:10px; font-size:0.75rem; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase;">Sign in →</a>` : ''}
          ${showHome  ? `<a href="index.html" style="display:block; padding:12px; border:0.5px solid #e8ddd0; color:#888780; border-radius:10px; font-size:0.75rem; letter-spacing:0.06em; text-decoration:none; text-align:center; margin-top:10px;">Back to Harper</a>` : ''}
        </div>
      </div>
    `;
  }

  try {
    // Check if user is logged in
    const sessionRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${localStorage.getItem('sb-qooofbxwhjmeoyhsihki-auth-token') ? JSON.parse(localStorage.getItem('sb-qooofbxwhjmeoyhsihki-auth-token')).access_token : ''}`
      }
    });

    // Use Supabase JS if available
    if (typeof supabase !== 'undefined') {
      const { createClient } = supabase;
      const client = createClient(SUPABASE_URL, SUPABASE_KEY);

      const { data: { session } } = await client.auth.getSession();

      if (!session) {
        showGateMessage(
          'Members only',
          'This area is reserved for approved Harper members. Please sign in or apply for access.',
          true, false
        );
        return;
      }

      const userEmail = session.user.email;

      // Look up their application status
      const { data: apps } = await client
        .from('applications')
        .select('status')
        .eq('email', userEmail)
        .order('submitted_at', { ascending: false })
        .limit(1);

      const status = apps && apps.length > 0 ? apps[0].status : null;

      if (status === 'approved') {
        // All good — remove the gate and show the page
        overlay.remove();
        return;
      }

      if (status === 'pending') {
        showGateMessage(
          'Application under review',
          'Thank you for applying to Harper. Our team reviews each application personally. You\'ll hear from us within 2 business days.',
          false, true
        );
        return;
      }

      if (status === 'rejected') {
        showGateMessage(
          'Application not approved',
          'Unfortunately your application didn\'t meet our current membership criteria. If you believe this is an error, please contact us at hello@harpernyc.com.',
          false, true
        );
        return;
      }

      // Logged in but no application found
      showGateMessage(
        'No application found',
        'We couldn\'t find a Harper membership application linked to your account. Please apply for access to continue.',
        false, false
      );
      overlay.innerHTML += `<div style="margin-top:10px;"><a href="apply.html" style="display:block; padding:12px; background:#A09070; color:#fff; border-radius:10px; font-size:0.75rem; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; text-align:center;">Apply for membership →</a></div>`;

    } else {
      // Supabase JS not loaded — redirect to login
      window.location.href = 'login.html';
    }

  } catch(err) {
    // On any error, redirect to login
    window.location.href = 'login.html';
  }

})();
