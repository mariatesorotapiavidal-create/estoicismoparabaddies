/* ============================================================
   app.js — Motor de hipertexto 2D + navegación Street-View + 3D
   - Sin giroscopio, sin audio.
   - Avance con flechas (mantener presionado) tipo Google Street View.
   - Hologramas flotantes abren cada poema (proximidad o clic).
   - Efecto Matrix de fondo agregado.
   ============================================================ */
(function () {
  "use strict";

  var SIMBOLO = { friccion: "🜔", eco: "🜂", bucle: "∞", fuga: "✺" };
  var LINK_RE = /\[\[([^\]|]+)\|([^\]|]+)\|([^\]]+)\]\]/g;

  var state = { current: null, history: [], lastSurface: "i" };
  var typeTimer = null;

  // efecto máquina de escribir sobre un verso (la IA lo teclea en vivo)
  function typeWriter(el){
    if(typeTimer){ clearInterval(typeTimer); typeTimer = null; }
    var fullHTML = el.innerHTML;                 // guardamos los enlaces para restaurarlos
    var clone = el.cloneNode(true);              // texto limpio, sin el glifo del enlace
    clone.querySelectorAll(".glifo").forEach(function(g){ g.remove(); });
    var text = clone.textContent;
    el.style.animation = "none"; el.style.opacity = "1";  // anula el cascade de streaming
    el.classList.add("typing");
    el.textContent = "";
    var i = 0;
    typeTimer = setInterval(function(){
      i++;
      el.textContent = text.slice(0, i);
      el.scrollIntoView({ block: "center" });
      if(i >= text.length){
        clearInterval(typeTimer); typeTimer = null;
        el.innerHTML = fullHTML;                 // vuelven los hipervínculos clicables
        el.classList.remove("typing");
      }
    }, 38);
  }

  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function $(s){return document.querySelector(s);}

  function lineToHTML(linea){
    if(linea === "") return '<div class="estrofa-sep"></div>';
    if(/^\[[^\[].*\]$/.test(linea)) return '<div class="escena">'+esc(linea.slice(1,-1))+"</div>";
    if(/^[—(]/.test(linea)) return '<div class="susurro">'+esc(linea)+"</div>";
    var html = esc(linea).replace(LINK_RE, function(_m,txt,dest,tipo){
      tipo = tipo.trim();
      return '<a href="#" class="enlace enlace-'+tipo+'" data-dest="'+dest+
             '" title="'+tipo+'">'+esc(txt)+'<sup class="glifo">'+(SIMBOLO[tipo]||"")+"</sup></a>";
    });
    return '<div class="verso">'+html+"</div>";
  }

  function render(id){
    var nodo = window.POEMAS[id];
    if(!nodo){ console.warn("Nodo inexistente:", id); return; }
    
    // Interceptores especiales
    if(nodo.special === "fuga"){ enterFuga(); return; }
    if(nodo.special === "mapa"){ enterMapa(); return; }
    
    leaveFuga();
    state.current = id;
    if(nodo.surface) state.lastSurface = id;
    $("#crumb").textContent = nodo.titulo || id;
    
    var meta = $("#panel-meta");
    // Volvemos a textContent para procesarlo como texto simple
    if(nodo.meta){ meta.textContent = nodo.meta; meta.style.display="block"; }
    else meta.style.display = "none";
    
    var body = $("#panel-body");
    body.innerHTML = nodo.versos.map(lineToHTML).join("");
    body.scrollTop = 0;
    clearReveal(body);
    $("#btn-back").style.visibility = state.history.length ? "visible" : "hidden";
    $("#panel").classList.remove("hidden");
    if(nodo.surface) applyReveal(body, nodo.reveal);   // animación propia de cada poema
  }
  function navigate(dest){ if(state.current) state.history.push(state.current); render(dest); }
  function goBack(){ if(state.history.length) render(state.history.pop()); }

  /* ---------- animaciones de apertura, una por poema ---------- */
  function clearReveal(body){
    body.classList.remove("rv-glitch","rv-zoom","rv-scan");
    $("#panel").classList.remove("flash");
  }
  function restartAnim(el, cls){ el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function flashPanel(){
    var p = $("#panel"); p.classList.remove("flash"); void p.offsetWidth; p.classList.add("flash");
    setTimeout(function(){ p.classList.remove("flash"); }, 420);
  }
  function streamLines(body){
    var kids = body.children;
    for(var i=0;i<kids.length;i++){
      kids[i].style.opacity = "0";
      kids[i].style.animation = "streamIn .32s ease forwards";
      kids[i].style.animationDelay = (i*0.055).toFixed(2)+"s";
    }
  }
  function applyReveal(body, kind){
    if(!kind) return;
    if(kind === "glitch") restartAnim(body, "rv-glitch");
    else if(kind === "zoom"){ restartAnim(body, "rv-zoom"); flashPanel(); }
    else if(kind === "scan") restartAnim(body, "rv-scan");
    else if(kind === "type") streamLines(body);
  }

  function enterFuga(){
    $("#panel").classList.add("hidden");
    $("#fuga-text").innerHTML = window.POEMAS.fuga.versos.map(function(l){
      return "<p>"+esc(l)+"</p>"; }).join("");
    document.body.classList.add("en-fuga");
  }
  function leaveFuga(){ document.body.classList.remove("en-fuga"); }

  function enterMapa() {
    $("#panel").classList.add("hidden"); // Ocultar el cristal si estuviera abierto
    $("#mapa-layer").classList.remove("hidden");
    
    var pilar = 0;
    $("#mapa-body").innerHTML = window.POEMAS.mapa.versos.map(function(l){
      if(l === "") return "<br/>";
      if(l.startsWith("[")){ pilar++; return "<div class='escena c" + pilar + "'>" + esc(l) + "</div>"; }
      return "<div class='verso'>" + esc(l) + "</div>";
    }).join("");
    
    state.current = "mapa";
  }

  function closeMapa() {
    $("#mapa-layer").classList.add("hidden");
    state.current = null; window.PoemaApp._active = null;
  }

  function closePanel(){
    $("#panel").classList.add("hidden");
    leaveFuga();
    state.current = null; state.history = [];
    window.PoemaApp._active = null;
  }

  window.PoemaApp = {
    _active: null,
    open: function(id, fromProximity){
      if(fromProximity && state.current && !$("#panel").classList.contains("hidden")) return;
      state.history = []; this._active = id; render(id);
    },
    proximityClose: function(id){
      if(this._active === id && !state.history.length) closePanel();
    },
    openIndex: function(){ closePanel(); $("#index2d").classList.remove("hidden"); },
    _tauntT: null,
    // texto burlón cuando un ícono esquiva el clic
    taunt: function(){
      var msgs = ["casi…", "fallaste", "jaja no", "ni cerca", "otra vez será", "uy, casi", "demasiado lento"];
      var t = document.getElementById("taunt");
      if(!t) return;
      t.textContent = msgs[Math.floor(Math.random() * msgs.length)];
      t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
      clearTimeout(this._tauntT);
      this._tauntT = setTimeout(function(){ t.classList.remove("show"); }, 950);
    },
    // clic en un ícono de IA: abre el poema III y aterriza en un verso aleatorio
    openIIIRandom: function(){
      this.open("iii");
      var body = $("#panel-body");
      var versos = body.querySelectorAll(".verso");
      if(!versos.length) return;
      var el = versos[Math.floor(Math.random() * versos.length)];
      versos.forEach(function(v){ v.classList.remove("verso-destacado"); });
      el.classList.add("verso-destacado");
      el.scrollIntoView({ block: "center" });
      typeWriter(el);
    }
  };

  /* ---------- navegación Street-View (flechas mantenidas) ---------- */
  function setupNav(){
    var rig = document.querySelector("#rig");
    var cam = document.querySelector("#cam");
    if(!rig || !cam) return;
    var dir = new THREE.Vector3();
    var held = {}, raf = null;
    var STEP = 0.08, ROT = 0.022, BOUND = 24;

    function frame(){
      if(rig.object3D && cam.object3D){
        if(held.fwd || held.back){
          cam.object3D.getWorldDirection(dir); dir.y = 0;
          if(dir.lengthSq() > 0.0001){
            dir.normalize();
            var s = held.fwd ? -STEP : STEP;   // getWorldDirection = +Z; el frente es -Z
            var p = rig.object3D.position;
            p.x += dir.x * s; p.z += dir.z * s;
            var r = Math.hypot(p.x, p.z);
            if(r > BOUND){ p.x *= BOUND/r; p.z *= BOUND/r; }
          }
        }
        if(held.left)  rig.object3D.rotation.y += ROT;
        if(held.right) rig.object3D.rotation.y -= ROT;
      }
      raf = (held.fwd||held.back||held.left||held.right) ? requestAnimationFrame(frame) : null;
    }
    function start(k){ held[k] = true; if(!raf) raf = requestAnimationFrame(frame); }
    function stop(k){ held[k] = false; }
    function bind(id,k){
      var el = document.getElementById(id); if(!el) return;
      el.addEventListener("pointerdown", function(e){ e.preventDefault(); start(k); });
      ["pointerup","pointerleave","pointercancel"].forEach(function(ev){
        el.addEventListener(ev, function(){ stop(k); });
      });
    }
    bind("nav-fwd","fwd"); bind("nav-back","back");
    bind("nav-left","left"); bind("nav-right","right");

    // teclado opcional (desktop)
    var KEY = {ArrowUp:"fwd",ArrowDown:"back",ArrowLeft:"left",ArrowRight:"right",
               w:"fwd",s:"back",a:"left",d:"right"};
    window.addEventListener("keydown", function(e){ if(KEY[e.key]){ e.preventDefault(); start(KEY[e.key]); }});
    window.addEventListener("keyup",   function(e){ if(KEY[e.key]) stop(KEY[e.key]); });
  }

  /* ---------- cableado del DOM ---------- */
  document.addEventListener("DOMContentLoaded", function(){
    $("#panel-body").addEventListener("click", function(e){
      var a = e.target.closest("a.enlace"); if(!a) return;
      e.preventDefault(); navigate(a.getAttribute("data-dest"));
    });
    $("#btn-back").addEventListener("click", goBack);
    $("#btn-close").addEventListener("click", closePanel);
    $("#fuga-volver").addEventListener("click", function(){
      leaveFuga(); state.history = []; render(state.lastSurface || "i");
    });
    $("#mapa-cerrar").addEventListener("click", closeMapa);

    var idx = $("#index2d-list");
    window.POEMAS_INDEX.forEach(function(p){
      var b = document.createElement("button");
      b.className = "idx-btn";
      b.innerHTML = '<span class="idx-n">'+p.n+"</span>"+p.label;
      b.addEventListener("click", function(){
        $("#index2d").classList.add("hidden"); window.PoemaApp.open(p.id);
      });
      idx.appendChild(b);
    });
    $("#btn-index").addEventListener("click", function(){ $("#index2d").classList.toggle("hidden"); });
    $("#index2d-close").addEventListener("click", function(){ $("#index2d").classList.add("hidden"); });

    // GATEWAY: solo el gato, sin sonido, sin giroscopio
    var gate = $("#gateway");
    $("#btn-enter").addEventListener("click", function(){
      gate.classList.add("fade");
      setTimeout(function(){ gate.style.display = "none"; }, 650);
      if(document.body.classList.contains("mode-2d")) window.PoemaApp.openIndex();
    });

    var catImg = $("#cat-img");
    if(catImg) catImg.addEventListener("error", function(){
      catImg.style.display = "none"; $("#cat-fallback").style.display = "block";
    });

    // arrancar navegación cuando la escena 3D esté lista
    var scene = document.querySelector("a-scene");
    if(scene && !document.body.classList.contains("mode-2d")){
      if(scene.hasLoaded) setupNav();
      else scene.addEventListener("loaded", setupNav);
    }
  });

  /* ---------- detección WebGL / fallback 2D ---------- */
  function webglOK(){
    try{ var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))); }
    catch(e){ return false; }
  }
  if(!webglOK() || /[?&]2d/.test(location.search)){
    document.documentElement.classList.add("no-3d");
    document.addEventListener("DOMContentLoaded", function(){ document.body.classList.add("mode-2d"); });
  }

  /* ============================================================
     Componentes A-Frame (registrados antes de parsear <a-scene>)
     ============================================================ */
  if(window.AFRAME){
    // holograma: abre su poema por proximidad y por clic
    AFRAME.registerComponent("hologram", {
      schema:{ poem:{type:"string"}, threshold:{default:3.6} },
      init:function(){
        this.rig = document.querySelector("#rig");
        this.inside = false;
        this._a = new THREE.Vector3(); this._b = new THREE.Vector3();
        this.el.classList.add("clickable");
        var self = this;
        this.el.addEventListener("click", function(){ window.PoemaApp.open(self.data.poem); });
      },
      tick:function(){
        if(!this.rig || !this.rig.object3D) return;
        this.el.object3D.getWorldPosition(this._a);
        this.rig.object3D.getWorldPosition(this._b);
        var d = this._a.distanceTo(this._b);
        if(d < this.data.threshold && !this.inside){
          this.inside = true; window.PoemaApp.open(this.data.poem, true);
        } else if(d > this.data.threshold + 1.4 && this.inside){
          this.inside = false; window.PoemaApp.proximityClose(this.data.poem);
        }
      }
    });

    // ialink: ícono de IA que abre un verso aleatorio del poema III.
    // Con evade>0, esquiva (se mueve) esa cantidad de veces antes de dejarse clickear.
    AFRAME.registerComponent("ialink", {
      schema:{ evade:{default:0} },
      init:function(){
        this.el.classList.add("clickable");
        var p = this.el.getAttribute("position") || {x:0,y:0,z:0};
        this.base = { x:p.x, y:p.y, z:p.z };
        this.tries = 0;
        var self = this;
        this.el.addEventListener("click", function(){
          // mientras le queden esquives, se mueve y no abre nada
          if(self.data.evade > 0 && self.tries < self.data.evade){
            self.tries++;
            self.dodge();
            window.PoemaApp.taunt();
            return;
          }
          self.tries = 0;
          if(self.data.evade > 0){
            self.el.setAttribute("animation__dodge", {
              property:"position", dur:200, easing:"easeOutQuad",
              to: self.base.x+" "+self.base.y+" "+self.base.z });
          }
          window.PoemaApp.openIIIRandom();
        });
      },
      dodge:function(){
        var b = this.base;
        var dx = (Math.random()*2 - 1) * 1.3;   // salto lateral
        var dy = (Math.random()*2 - 1) * 0.55;  // salto vertical
        this.el.setAttribute("animation__dodge", {
          property:"position", dur:260, easing:"easeOutBack",
          to: (b.x+dx).toFixed(2)+" "+(b.y+dy).toFixed(2)+" "+b.z });
      }
    });
  }

  /* ============================================================
     EFECTO MATRIX (Background)
     ============================================================ */
  function initMatrix() {
    var canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres, incluyendo tus símbolos especiales
    var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ🜔🜂∞✺'.split('');
    var fontSize = 14;
    var columns = canvas.width / fontSize;
    var drops = [];
    for (var x = 0; x < columns; x++) drops[x] = 1;

    // Ejecuta el algoritmo a ~22 FPS para cuidar el rendimiento móvil
    setInterval(function() {
      // Fondo negro translúcido para el efecto estela
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Color primario (rojo oscuro) extraído de tu paleta
      ctx.fillStyle = 'oklch(0.7428 0.1563 21.5624)';
      ctx.font = fontSize + 'px monospace';
      
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 45);
  }

  // Arrancar el Matrix al cargar el DOM
  document.addEventListener("DOMContentLoaded", initMatrix);
  
  // Ajustar el canvas si rotan la pantalla del celular
  window.addEventListener('resize', function(){
    var canvas = document.getElementById('matrix-bg');
    if(canvas){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  });

})();
