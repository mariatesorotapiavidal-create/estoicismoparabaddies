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
    $("#btn-back").style.visibility = state.history.length ? "visible" : "hidden";
    $("#panel").classList.remove("hidden");
  }
  function navigate(dest){ if(state.current) state.history.push(state.current); render(dest); }
  function goBack(){ if(state.history.length) render(state.history.pop()); }

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
    
    $("#mapa-body").innerHTML = window.POEMAS.mapa.versos.map(function(l){
      if(l === "") return "<br/>";
      if(l.startsWith("[")) return "<div class='escena'>" + esc(l) + "</div>";
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
    openIndex: function(){ closePanel(); $("#index2d").classList.remove("hidden"); }
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
