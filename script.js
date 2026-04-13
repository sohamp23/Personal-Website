const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    const progress = document.getElementById('scrollProgress');
    const toast = document.getElementById('copyToast');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;

    if (window.matchMedia('(pointer:fine)').matches) {
      document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      });

      function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();

      document.querySelectorAll('a, button, .project-card, .chip').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '20px';
          cursor.style.height = '20px';
          ring.style.width = '50px';
          ring.style.height = '50px';
          ring.style.borderColor = 'rgba(123,110,246,0.8)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.width = '12px';
          cursor.style.height = '12px';
          ring.style.width = '36px';
          ring.style.height = '36px';
          ring.style.borderColor = 'rgba(123,110,246,0.5)';
        });
      });
    }

    window.addEventListener('scroll', () => {
      const height = document.body.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (window.scrollY / height) * 100 : 0;
      progress.style.width = pct + '%';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 100 * Number(entry.target.dataset.delay || 0));
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.timeline-item, .project-card').forEach((el, i) => {
      el.dataset.delay = i;
      observer.observe(el);
    });

    setTimeout(() => {
      document.querySelectorAll('.timeline-item, .project-card').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }, 1200);

    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', async () => {
        const email = link.getAttribute('href').replace('mailto:', '');
        try {
          await navigator.clipboard.writeText(email);
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1800);
        } catch (err) {
          // Ignore clipboard errors and continue with normal mailto behavior.
        }
      });
    });
  
const sohamKnowledge = {
  education: "Soham Patel is a third-year University of Toronto student pursuing an Honours BSc in Computer Science and Commerce with a Minor in Applied Mathematics, graduating in 2027 with a 3.82 GPA.",
  skills: "Soham works across Python, C/C++, Java, JavaScript, TypeScript, MATLAB, and R. He has experience with React, React Native, Node.js, Flask, Django, TensorFlow, Scikit-Learn, Pandas, NumPy, Firebase, Figma, Adobe XD, Git, and QuickBooks.",
  evolvere: "At Evolvere Mental Health, Soham helped build and ship a production iOS app using React Native and Firebase. The platform was built for university students and supported 1,000+ users. He also handled sponsor outreach and business development to expand visibility and partnerships.",
  pythonta: "Soham worked as a PythonTA Researcher at the University of Toronto, contributing to the open-source static analysis tool used across CS courses. He worked on regression tests, validation workflows, bug triage, and reliability improvements that reduced false-positive feedback.",
  afterdark: "At AfterDark Creatives, Soham worked as an AI Automation Engineer, building receptionist-style AI agents for small businesses and designing responsive websites to improve engagement, brand visibility, and traffic.",
  projects: "Soham's highlighted projects include an Algorithmic Trading Bot using FinBERT sentiment analysis with backtesting over 3 years of SPY data, an AI Investment Dashboard built with Flask and React for real-time analytics and stock forecasting, and Evolvere, a mobile mental health app for students.",
  trading: "The Algorithmic Trading Bot is a Python-based trading system that used FinBERT sentiment analysis to generate buy and sell signals, automated bracket orders for risk management, and was validated through backtests on 3 years of SPY data with 80%+ directional accuracy.",
  dashboard: "The AI Investment Dashboard is a Flask and React project with real-time analytics, interactive visualizations, and machine learning models trained to forecast stock movement with time-aware validation and 80%+ forecast accuracy.",
  contact: "You can reach Soham through LinkedIn at linkedin.com/in/soham-patel23, by phone at 647-833-1265, or through the contact section on this site.",
  interests: "Soham is especially interested in building at the intersection of intelligent systems, financial technology, automation, and clean user-facing products.",
  general: "Soham Patel is a University of Toronto Computer Science and Commerce student who likes building products that actually ship. His background blends software development, AI automation, business development, and product-minded technical work."
};

function getBotReply(question) {
  const q = question.toLowerCase();

  if (q.includes('study') || q.includes('school') || q.includes('university') || q.includes('gpa') || q.includes('education') || q.includes('major') || q.includes('minor')) return sohamKnowledge.education;
  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tool') || q.includes('framework')) return sohamKnowledge.skills;
  if (q.includes('evolvere') || q.includes('mental health') || q.includes('ios') || q.includes('react native') || q.includes('firebase')) return sohamKnowledge.evolvere;
  if (q.includes('pythonta') || q.includes('research') || q.includes('university of toronto') || q.includes('static analysis')) return sohamKnowledge.pythonta;
  if (q.includes('afterdark') || q.includes('automation') || q.includes('ai agent') || q.includes('receptionist')) return sohamKnowledge.afterdark;
  if (q.includes('project') || q.includes('built') || q.includes('build') || q.includes('portfolio')) return sohamKnowledge.projects;
  if (q.includes('trading') || q.includes('finbert') || q.includes('spy')) return sohamKnowledge.trading;
  if (q.includes('dashboard') || q.includes('invest') || q.includes('flask') || q.includes('react')) return sohamKnowledge.dashboard;
  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('linkedin') || q.includes('phone')) return sohamKnowledge.contact;
  if (q.includes('interest') || q.includes('focus') || q.includes('what does he like') || q.includes('why')) return sohamKnowledge.interests;

  return sohamKnowledge.general + " Ask about his projects, skills, Evolvere work, PythonTA research, education, or experience.";
}

const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

function appendMessage(type, text) {
  const message = document.createElement('div');
  message.className = `chat-msg ${type}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleQuestion(question) {
  if (!question.trim()) return;
  appendMessage('user', question.trim());

  setTimeout(() => {
    appendMessage('bot', getBotReply(question));
  }, 280);
}

if (chatbotForm && chatbotInput && chatbotMessages) {
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = chatbotInput.value;
    handleQuestion(question);
    chatbotInput.value = '';
  });

}