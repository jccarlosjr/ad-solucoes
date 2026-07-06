/* ==========================================================================
   AD Soluções — Simulator Logic (Grade Completa)
   Fetch prices, calculate quotes using full age grid, and capture simulator leads.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    let priceData = null;

    // ==========================================
    // 1. Initialize Lucide Icons
    // ==========================================
    const initLucide = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };
    initLucide();

    // ==========================================
    // 2. Dark Mode Toggle
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' 
                ? '<i data-lucide="sun" class="theme-toggle-icon"></i>' 
                : '<i data-lucide="moon" class="theme-toggle-icon"></i>';
            initLucide();
        }
    };
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // ==========================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerOverlay = document.getElementById('drawer-overlay');

    if (menuToggle && drawer && drawerClose && drawerOverlay) {
        menuToggle.addEventListener('click', () => {
            drawer.classList.add('open');
            drawerOverlay.classList.add('active');
        });
        drawerClose.addEventListener('click', () => {
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
        });
        drawerOverlay.addEventListener('click', () => {
            drawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
        });
    }

    // ==========================================
    // 4. Pricing Structure (Direct Embedding)
    // ==========================================
    priceData = {
      "operator": {
        "id": "amil",
        "name": "Amil",
        "segment": "PME/Empresarial",
        "coparticipation": "30%",
        "mei": true,
        "adhesion_fee": false,
        "reference_month": "2026-04",
        "last_update": "2026-04-07"
      },
      "plans": [
        {
          "lives": {
            "min": 2,
            "max": 4
          },
          "accommodations": [
            {
              "type": "Enfermaria",
              "plans": [
                {
                  "name": "Amil Prata",
                  "prices": [
                    { "age_range": "0-18", "price": 248.97 },
                    { "age_range": "19-23", "price": 291.29 },
                    { "age_range": "24-28", "price": 355.37 },
                    { "age_range": "29-33", "price": 426.44 },
                    { "age_range": "34-38", "price": 447.76 },
                    { "age_range": "39-43", "price": 492.54 },
                    { "age_range": "44-48", "price": 615.68 },
                    { "age_range": "49-53", "price": 677.25 },
                    { "age_range": "54-58", "price": 846.56 },
                    { "age_range": "59+", "price": 1481.48 }
                  ]
                },
                {
                  "name": "Amil Ouro",
                  "prices": [
                    { "age_range": "0-18", "price": 286.79 },
                    { "age_range": "19-23", "price": 335.54 },
                    { "age_range": "24-28", "price": 409.36 },
                    { "age_range": "29-33", "price": 491.23 },
                    { "age_range": "34-38", "price": 515.79 },
                    { "age_range": "39-43", "price": 567.37 },
                    { "age_range": "44-48", "price": 709.21 },
                    { "age_range": "49-53", "price": 780.13 },
                    { "age_range": "54-58", "price": 975.16 },
                    { "age_range": "59+", "price": 1706.53 }
                  ]
                }
              ]
            },
            {
              "type": "Apartamento",
              "plans": [
                {
                  "name": "Amil Prata",
                  "prices": [
                    { "age_range": "0-18", "price": 276.36 },
                    { "age_range": "19-23", "price": 323.34 },
                    { "age_range": "24-28", "price": 394.47 },
                    { "age_range": "29-33", "price": 473.36 },
                    { "age_range": "34-38", "price": 497.03 },
                    { "age_range": "39-43", "price": 546.73 },
                    { "age_range": "44-48", "price": 683.41 },
                    { "age_range": "49-53", "price": 751.75 },
                    { "age_range": "54-58", "price": 939.69 },
                    { "age_range": "59+", "price": 1644.46 }
                  ]
                },
                {
                  "name": "Amil Ouro",
                  "prices": [
                    { "age_range": "0-18", "price": 318.34 },
                    { "age_range": "19-23", "price": 372.46 },
                    { "age_range": "24-28", "price": 454.40 },
                    { "age_range": "29-33", "price": 545.28 },
                    { "age_range": "34-38", "price": 572.54 },
                    { "age_range": "39-43", "price": 629.79 },
                    { "age_range": "44-48", "price": 787.24 },
                    { "age_range": "49-53", "price": 865.96 },
                    { "age_range": "54-58", "price": 1082.45 },
                    { "age_range": "59+", "price": 1894.29 }
                  ]
                },
                {
                  "name": "Platinum R1",
                  "prices": [
                    { "age_range": "0-18", "price": 385.17 },
                    { "age_range": "19-23", "price": 450.65 },
                    { "age_range": "24-28", "price": 549.79 },
                    { "age_range": "29-33", "price": 659.75 },
                    { "age_range": "34-38", "price": 692.74 },
                    { "age_range": "39-43", "price": 762.01 },
                    { "age_range": "44-48", "price": 952.51 },
                    { "age_range": "49-53", "price": 1047.76 },
                    { "age_range": "54-58", "price": 1309.70 },
                    { "age_range": "59+", "price": 2291.98 }
                  ]
                },
                {
                  "name": "Platinum R2",
                  "prices": [
                    { "age_range": "0-18", "price": 388.99 },
                    { "age_range": "19-23", "price": 455.12 },
                    { "age_range": "24-28", "price": 555.25 },
                    { "age_range": "29-33", "price": 666.30 },
                    { "age_range": "34-38", "price": 699.62 },
                    { "age_range": "39-43", "price": 769.58 },
                    { "age_range": "44-48", "price": 961.98 },
                    { "age_range": "49-53", "price": 1058.18 },
                    { "age_range": "54-58", "price": 1322.73 },
                    { "age_range": "59+", "price": 2314.78 }
                  ]
                }
              ]
            }
          ]
        },
        {
          "lives": {
            "min": 5,
            "max": 29
          },
          "accommodations": [
            {
              "type": "Enfermaria",
              "plans": [
                {
                  "name": "Amil Prata",
                  "prices": [
                    { "age_range": "0-18", "price": 223.92 },
                    { "age_range": "19-23", "price": 261.99 },
                    { "age_range": "24-28", "price": 319.63 },
                    { "age_range": "29-33", "price": 383.56 },
                    { "age_range": "34-38", "price": 402.74 },
                    { "age_range": "39-43", "price": 443.01 },
                    { "age_range": "44-48", "price": 553.76 },
                    { "age_range": "49-53", "price": 609.14 },
                    { "age_range": "54-58", "price": 761.43 },
                    { "age_range": "59+", "price": 1332.50 }
                  ]
                },
                {
                  "name": "Amil Ouro",
                  "prices": [
                    { "age_range": "0-18", "price": 257.94 },
                    { "age_range": "19-23", "price": 301.79 },
                    { "age_range": "24-28", "price": 368.18 },
                    { "age_range": "29-33", "price": 441.82 },
                    { "age_range": "34-38", "price": 463.91 },
                    { "age_range": "39-43", "price": 510.30 },
                    { "age_range": "44-48", "price": 637.88 },
                    { "age_range": "49-53", "price": 701.67 },
                    { "age_range": "54-58", "price": 877.09 },
                    { "age_range": "59+", "price": 1534.91 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const loadSimulatorData = () => {
        try {
            // Populate Operator select
            const operatorSelect = document.getElementById('sim-operator');
            operatorSelect.innerHTML = `<option value="${priceData.operator.id}">${priceData.operator.name} (${priceData.operator.segment})</option>`;

            // Generate age range input fields in grid layout
            const ageInputsContainer = document.getElementById('age-inputs-container');
            ageInputsContainer.innerHTML = '';

            const samplePrices = priceData.plans[0].accommodations[0].plans[0].prices;
            samplePrices.forEach((priceObj) => {
                const ageRange = priceObj.age_range;
                const card = document.createElement('div');
                card.className = 'age-input-card';
                card.innerHTML = `
                    <span>${ageRange}</span>
                    <input type="number" min="0" value="0" data-age-range="${ageRange}" class="age-input">
                `;
                ageInputsContainer.appendChild(card);
            });

            // Update Summary Labels
            updateSummaryLabels();

        } catch (error) {
            console.error('Error loading pricing data:', error);
        }
    };

    // Helper to update summary labels in real-time
    const updateSummaryLabels = () => {
        const opSelect = document.getElementById('sim-operator');
        const accSelect = document.getElementById('sim-accommodation');
        const ageInputs = document.querySelectorAll('.age-input');
        
        let totalLives = 0;
        ageInputs.forEach(input => {
            totalLives += parseInt(input.value || 0, 10);
        });

        document.getElementById('lead-summary-operator').textContent = opSelect ? opSelect.options[opSelect.selectedIndex]?.text : '-';
        document.getElementById('lead-summary-accommodation').textContent = accSelect ? accSelect.value : '-';
        document.getElementById('lead-summary-lives').textContent = totalLives;
    };

    // Listen to changes to keep summary updated
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('age-input') || e.target.classList.contains('sim-select')) {
            updateSummaryLabels();
        }
    });

    // Run loader
    loadSimulatorData();

    // ==========================================
    // 5. Simulator Math Logic
    // ==========================================
    const btnSimulate = document.getElementById('btn-simulate');
    const resultsContainer = document.getElementById('results-container');
    const plansResultsList = document.getElementById('plans-results-list');

    if (btnSimulate) {
        btnSimulate.addEventListener('click', () => {
            if (!priceData) return;

            const accommodationType = document.getElementById('sim-accommodation').value;
            const ageInputs = document.querySelectorAll('.age-input');
            
            let totalLives = 0;
            const distribution = {};

            ageInputs.forEach(input => {
                const range = input.dataset.ageRange;
                const qty = parseInt(input.value || 0, 10);
                totalLives += qty;
                if (qty > 0) {
                    distribution[range] = qty;
                }
            });

            if (totalLives < 2) {
                alert('O simulador exige um mínimo de 2 vidas para calcular tabelas PME/MEI.');
                return;
            }

            // Find correct plans list based on total lives range
            const planGroup = priceData.plans.find(g => totalLives >= g.lives.min && totalLives <= g.lives.max);

            if (!planGroup) {
                alert(`Não encontramos tabela correspondente para a quantidade de ${totalLives} vidas. Entre em contato conosco para cotações personalizadas.`);
                return;
            }

            // Find accommodation entry
            const accommodationEntry = planGroup.accommodations.find(a => a.type === accommodationType);
            if (!accommodationEntry) {
                alert(`Acomodação ${accommodationType} não disponível.`);
                return;
            }

            // Formatter for BRL currency
            const formatCurrency = (value) => {
                return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
            };

            // Render result cards
            plansResultsList.innerHTML = '';
            
            accommodationEntry.plans.forEach(plan => {
                let planTotal = 0;
                let tableRows = '';

                // Calculate price for each age range
                plan.prices.forEach(priceObj => {
                    const range = priceObj.age_range;
                    const qty = distribution[range] || 0;
                    if (qty > 0) {
                        const cost = priceObj.price * qty;
                        planTotal += cost;
                        tableRows += `
                            <tr>
                                <td>Faixa ${range}</td>
                                <td>${qty} x ${formatCurrency(priceObj.price)}</td>
                                <td style="text-align: right; font-weight: 600;">${formatCurrency(cost)}</td>
                            </tr>
                        `;
                    }
                });

                // Build plan card
                const card = document.createElement('div');
                card.className = 'plan-result-card';
                card.innerHTML = `
                    <div class="plan-result-header">
                        <div class="plan-title-wrapper">
                            <h3>${plan.name}</h3>
                            <span class="plan-badge">${accommodationType}</span>
                        </div>
                        <div class="plan-total-price">
                            <span>Total Mensal Estimado</span>
                            <strong>${formatCurrency(planTotal)}</strong>
                        </div>
                    </div>
                    <table class="prices-table">
                        <thead>
                            <tr>
                                <th>Faixa Etária</th>
                                <th>Quantidade x Valor Unitário</th>
                                <th style="text-align: right;">Total Parcial</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                `;
                plansResultsList.appendChild(card);
            });

            resultsContainer.classList.add('active');
            
            // Smooth scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // ==========================================
    // 6. Lead Capture Form Integration
    // ==========================================
    const leadForm = document.getElementById('simulator-lead-form');
    const nameInput = document.getElementById('lead-name');
    const phoneInput = document.getElementById('lead-phone');
    const successMsg = document.getElementById('sim-lead-success');

    // Phone format utility
    const formatPhone = (value) => {
        if (!value) return '';
        let clean = value.replace(/\D/g, '').substring(0, 11);
        if (clean.length === 0) return '';
        if (clean.length <= 2) return `(${clean}`;
        if (clean.length <= 6) return `(${clean.substring(0, 2)}) ${clean.substring(2)}`;
        if (clean.length <= 10) return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
        return `(${clean.substring(0, 2)}) ${clean.substring(2, 7)}-${clean.substring(7)}`;
    };

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            let hasError = false;
            document.getElementById('name-error').style.display = 'none';
            document.getElementById('phone-error').style.display = 'none';

            if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
                const err = document.getElementById('name-error');
                err.textContent = 'Nome completo é obrigatório.';
                err.style.display = 'block';
                hasError = true;
            }

            const phoneVal = phoneInput.value.replace(/\D/g, '');
            if (!phoneVal || phoneVal.length < 10) {
                const err = document.getElementById('phone-error');
                err.textContent = 'Insira um WhatsApp válido com DDD.';
                err.style.display = 'block';
                hasError = true;
            }

            if (hasError) return;

            // Submit visual loading state
            const btnSubmit = document.getElementById('btn-submit-sim-lead');
            const btnText = btnSubmit.querySelector('.btn-text');
            const btnLoader = btnSubmit.querySelector('.btn-loader');
            
            if (btnSubmit) btnSubmit.disabled = true;
            if (btnText) btnText.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');

            setTimeout(() => {
                // Collect distribution
                const ageInputs = document.querySelectorAll('.age-input');
                const distribution = {};
                ageInputs.forEach(input => {
                    const range = input.dataset.ageRange;
                    const qty = parseInt(input.value || 0, 10);
                    if (qty > 0) distribution[range] = qty;
                });

                console.log('Lead Simulador Capturado (Grade):', {
                    nome: nameInput.value,
                    whatsapp: phoneInput.value,
                    email: document.getElementById('lead-email').value,
                    operadora: document.getElementById('sim-operator').options[0]?.text,
                    acomodacao: document.getElementById('sim-accommodation').value,
                    distribuicao_vidas: distribution,
                    timestamp: new Date().toISOString()
                });

                if (btnSubmit) btnSubmit.style.display = 'none';
                if (successMsg) successMsg.classList.remove('hidden');
            }, 1200);
        });
    }
});
