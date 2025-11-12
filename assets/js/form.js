 (function(){
    const form = document.forms['briefing-criaid'];
    if(!form) return;
    const steps = Array.from(form.querySelectorAll('.step'));
    const prevBtn = form.querySelector('#prevBtn');
    const nextBtn = form.querySelector('#nextBtn');
    const submitBtn = form.querySelector('#submitBtn');
    const progressFill = form.querySelector('#progressFill');
    const progressText = form.querySelector('#progressText');
    const resumoBox = form.querySelector('#resumoBox');
    const resumoHidden = form.querySelector('#resumoHidden');
    let current = 0;

    function showStep(i){
      steps.forEach((el,idx)=> el.classList.toggle('hidden', idx!==i));
      prevBtn.disabled = i===0;
      nextBtn.classList.toggle('hidden', i===steps.length-1);
      submitBtn.classList.toggle('hidden', i!==steps.length-1);
      const pct = Math.round(((i+1)/steps.length)*100);
      progressFill.style.width = pct+'%';
      progressText.textContent = (i+1) + '/' + steps.length;
      if(i===steps.length-1) buildResumo();
      window.scrollTo({top: form.getBoundingClientRect().top + window.scrollY - 120, behavior:'smooth'});
    }

    function requiredOk(){
      const required = steps[current].querySelectorAll('[required]');
      for(const field of required){
        if(field.type==='radio'){
          const group = form.querySelectorAll(`input[name="${field.name}"]`);
          const anyChecked = Array.from(group).some(r=>r.checked);
          if(!anyChecked){ field.focus(); return false; }
        } else if(!field.value.trim()){ field.focus(); return false; }
      }
      return true;
    }

    function buildResumo(){
      const data = new FormData(form);
      const linhas = [
        `Ideia: ${data.get('ideia')||''}`,
        `Tipo: ${data.get('tipo')||''}`,
        `Objetivo: ${data.get('objetivo')||''}${data.get('objetivo_outro')? ' — '+data.get('objetivo_outro'):''}`,
        `Orçamento: ${data.get('orcamento')||''}`,
        `Prazo: ${data.get('prazo')||''}`,
        `Nome: ${data.get('nome')||''}`,
        `E-mail: ${data.get('email')||''}`,
        `WhatsApp: ${data.get('whatsapp')||''}`,
        `Contato preferido: ${data.get('contato_preferido')||'—'}`
      ];
      resumoBox.innerHTML = '<ul class="space-y-1">' + linhas.map(l=>`<li>• ${l}</li>`).join('') + '</ul>';
      resumoHidden.value = linhas.join('\n');
    }

    prevBtn.addEventListener('click', ()=>{ if(current>0){ current--; showStep(current);} });
    nextBtn.addEventListener('click', ()=>{ if(requiredOk()){ current++; showStep(current);} });
    form.addEventListener('submit', ()=>{ buildResumo(); });

    // showStep(0);
  })();