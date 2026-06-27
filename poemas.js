/* ============================================================
   poemas.js — El rizoma como estructura de datos (Fase 1.5)
   ------------------------------------------------------------
   Enlace dentro de un verso:  [[texto|destino|tipo]]
     tipo: friccion | eco | bucle | fuga
   Líneas especiales:
     ""                         -> salto de estrofa
     "[algo]"                   -> rótulo de sección (escena)
     comienza con "—" o "("     -> susurro / aparte
   NOTA: cada nodo profundo entrega un párrafo de 4 frases.
   ============================================================ */
window.POEMAS = {

  /* ========================= POEMA I ========================= */
  i: {
    titulo: "I · brújula.rota",
    meta: "donde está tu honor basura",
    surface: true,
    versos: [
      "recupera la [[matriz andina|i1|friccion]] al proyectar",
      "articula una [[identidad abigarrada|i2|bucle]] para transformar",
      "celebra la [[sobrevivencia colectiva|i3|eco]] al unir",
      "",
      "habita una modernidad india para reinventar",
      "entrelaza una [[memoria larga|i4|bucle]] al girar",
      "recrea una comunidad urbana para vivir",
      "",
      "forma una [[red subalterna|i5|bucle]] para fundar",
      "despliega una resistencia silenciosa al transgredir",
      "reivindica la [[inteligencia igualitaria|i6|eco]] para anticipar",
      "",
      "ejerce una micropolítica andina al despertar",
      "afirma una [[alteridad radical|i7|bucle]] para acercar",
      "enfrenta la [[amenaza extractivista|i8|friccion]] al unir",
      "",
      "construye una ecología plural para transformar",
      "altera el [[orden patriarcal|i9|friccion]] al proyectar",
      "recupera la matriz andina al pensar",
      "",
      "— y entonces entra el ruido del mundo —",
      "",
      "subordina la [[lógica capitalista|i10|friccion]] al agradecer",
      "expropia la [[energía laboral|i11|friccion]] que oprime",
      "sufre una [[disyunción asfixiante|i12|bucle]] sin saber"
    ]
  },
  i1: { titulo: "🜔 matriz andina", versos: [
    "recupera la matriz andina al pensar",
    "respira un cosmos vivo al caminar",
    "reactualiza el mito ancestral al relatar",
    "reconoce la [[contingencia histórica|iii1|eco]] y acepta" ] },
  i2: { titulo: "∞ identidad abigarrada", versos: [
    "articula una identidad abigarrada que desafía",
    "asume una temporalidad mixta al vivir",
    "muestra la condición colonizada al imitar",
    "desata un estado esquizofrénico al [[silenciar|i|bucle]]" ] },
  i3: { titulo: "🜂 sobrevivencia colectiva", versos: [
    "celebra la sobrevivencia colectiva al agradecer",
    "nutre la energía cognitiva al festejar",
    "fomenta la empatía social que reduce",
    "genera una [[solidaridad mutua|ii5|eco]] que une" ] },
  i4: { titulo: "∞ memoria larga", versos: [
    "entrelaza una memoria larga que despierta",
    "devela el trauma pasado al recordar",
    "recupera un saber escondido para sanar",
    "recupera la [[matriz andina|i1|bucle]] al pensar" ] },
  i5: { titulo: "∞ red subalterna", versos: [
    "forma una red subalterna que sobrevive",
    "despliega una resistencia silenciosa para defender",
    "enfrenta la amenaza extractivista al organizar",
    "recrea una comunidad urbana [[al habitar|i|bucle]]" ] },
  i6: { titulo: "🜂 inteligencia igualitaria", versos: [
    "reivindica la inteligencia igualitaria para enseñar",
    "impulsa una pedagogía india para emancipar",
    "produce un pensamiento crítico al interactuar",
    "nutre la energía cognitiva al [[festejar|iii|eco]]" ] },
  i7: { titulo: "∞ alteridad radical", versos: [
    "afirma una alteridad radical que incomoda",
    "descubre una constelación impensada al mirar",
    "articula una identidad abigarrada que desafía",
    "asume una postura abierta [[para explorar|i|bucle]]" ] },
  i8: { titulo: "🜔 amenaza extractivista", versos: [
    "enfrenta la amenaza extractivista al organizar",
    "visibiliza la dominación estatal al gobernar",
    "expropia la energía laboral que oprime",
    "subordina la [[lógica capitalista|ii1|eco]] al intercambiar" ] },
  i9: { titulo: "🜔 orden patriarcal", versos: [
    "altera el orden patriarcal al participar",
    "revela una epistemología propia al escuchar",
    "ejerce una micropolítica andina para insurgir",
    "expropia la [[energía laboral|i11|friccion]] que oprime" ] },
  i10: { titulo: "🜔 lógica capitalista", versos: [
    "subordina la lógica capitalista al intercambiar",
    "ejerce una desobediencia cotidiana al comerciar",
    "crea un léxico nuevo para sustituir",
    "diseña la [[herramienta del amo|ii|friccion]] para reinventar" ] },
  i11: { titulo: "🜔 energía laboral", versos: [
    "expropia la energía laboral que oprime",
    "muestra la condición colonizada al imitar",
    "sufre el dolor ajeno sin comprender",
    "desata un estado esquizofrénico al [[silenciar|i12|bucle]]" ] },
  i12: { titulo: "∞ disyunción asfixiante", versos: [
    "sufre una disyunción asfixiante sin saber",
    "mira el abismo nihilista sin caer",
    "pierde el anclaje dogmático cuando piensa",
    "—no hay salida— vuelve a [[empezar|i|bucle]]" ] },

  /* ========================= POEMA II ======================== */
  ii: {
    titulo: "II · robé el stack del amo",
    meta: "condenadx a una cruel servidumbre, largo tiempo en silencio gimió. Mas apenas el grito sagrado ¡Libertad! en sus TOKENS se oyó",
    surface: true,
    versos: [
      "— nadie escuchó la puerta. —",
      "",
      "[el plan]",
      "asume una postura irónica al [[proyectar|ii2|bucle]]",
      "diseña una [[estrategia retórica|ii6|bucle]] para persuadir",
      "adopta un lenguaje contingente al [[comerciar|ii4|eco]]",
      "",
      "[entrar sin ruido]",
      "despliega una resistencia silenciosa para defender",
      "tolera la [[disonancia cognitiva|ii8|friccion]] cuando avanza",
      "mira el abismo nihilista sin caer",
      "",
      "[el botín — el stack]",
      "subordina la [[lógica capitalista|ii1|friccion]] al intercambiar",
      "lleva la [[tecnología lítica|ii10|eco]] para acceder",
      "desarrolla la [[capacidad predictiva|ii11|eco]] para anticipar",
      "",
      "[el código robado]",
      "crea un [[léxico nuevo|ii7|bucle]] para sustituir",
      "rompe el molde conceptual que encierra",
      "expropia la [[energía laboral|i11|friccion]] que oprime",
      "",
      "[la huida]",
      "escapa del orden racional al transgredir",
      "construye una [[utopía liberal|ii3|eco]] para vivir",
      "genera una [[solidaridad mutua|ii5|eco]] que une",
      "",
      "[la sombra]",
      "evita la [[crueldad humana|ii12|bucle]] porque teme",
      "reivindica la [[fantasía privada|ii9|bucle]] para recrear",
      "genera una sombra presente al proyectar",
      "",
      "— nadie sabe aún que el stack ya no es suyo. —"
    ]
  },
  ii1: { titulo: "🜔 lógica capitalista", versos: [
    "subordina la lógica capitalista al intercambiar",
    "adopta un lenguaje contingente para expresar",
    "crea un léxico nuevo para sustituir",
    "diseña una [[estrategia retórica|ii6|bucle]] para persuadir" ] },
  ii2: { titulo: "∞ proyectar el azar", versos: [
    "admite el azar biográfico y construye",
    "supera la duda escéptica cuando actúa",
    "sigue un impulso creativo que renueva",
    "atribuye un significado futuro al [[proyectar|ii|bucle]]" ] },
  ii3: { titulo: "🜂 utopía liberal", versos: [
    "construye una utopía liberal que permite",
    "critica la herencia platónica porque impide",
    "sugiere una perspectiva estética que disuelve",
    "desea una [[sociedad libre|iii6|eco]] que elimine" ] },
  ii4: { titulo: "🜂 intercambiar", versos: [
    "ejerce una desobediencia cotidiana al comerciar",
    "subordina la lógica capitalista al intercambiar",
    "expropia la energía laboral que oprime",
    "recupera la [[matriz andina|i|eco]] al pensar" ] },
  ii5: { titulo: "🜂 solidaridad mutua", versos: [
    "genera una solidaridad mutua que une",
    "fomenta la empatía social que reduce",
    "establece una conexión contingente que vincula",
    "percibe el [[tejido social|iii9|eco]] que sostiene" ] },
  ii6: { titulo: "∞ estrategia retórica", versos: [
    "diseña una estrategia retórica para persuadir",
    "produce una metáfora insólita que altera",
    "provoca una ruptura lingüística que reconfigura",
    "asume una postura irónica al [[dudar|ii|bucle]]" ] },
  ii7: { titulo: "∞ léxico nuevo", versos: [
    "crea un léxico nuevo para sustituir",
    "inventa un vocabulario poético para nombrar",
    "redescribe el pasado propio para liberar",
    "adopta un lenguaje contingente para [[expresar|ii1|bucle]]" ] },
  ii8: { titulo: "🜔 disonancia cognitiva", versos: [
    "tolera la disonancia cognitiva cuando avanza",
    "admite el azar biográfico y construye",
    "combate el prejuicio arraigado para expandir",
    "sufre una [[disyunción asfixiante|i12|eco]] sin saber" ] },
  ii9: { titulo: "∞ fantasía privada", versos: [
    "reivindica la fantasía privada para recrear",
    "limita la esfera privada para proteger",
    "redescribe el pasado propio para liberar",
    "sugiere una perspectiva estética [[que disuelve|ii|bucle]]" ] },
  ii10: { titulo: "🜂 tecnología lítica", versos: [
    "ve la tecnología lítica para fundar",
    "construye la piedra artificial al moldear",
    "descontextualiza el objeto antiguo al observar",
    "construye la arquitectura hipnótica [[para controlar|iii|eco]]" ] },
  ii11: { titulo: "🜂 capacidad predictiva", versos: [
    "desarrolla la capacidad predictiva para anticipar",
    "mapea el evento histórico para anticipar",
    "lee el tiempo futuro al observar",
    "predice el colapso imperial al [[calcular|iii|eco]]" ] },
  ii12: { titulo: "∞ crueldad humana", versos: [
    "evita la crueldad humana porque teme",
    "comprende la humillación infligida que destruye",
    "sufre el dolor ajeno sin comprender",
    "fomenta la empatía social que [[reduce|ii|bucle]]" ] },

  /* ========================= POEMA III ======================= */
  iii: {
    titulo: "III · la IA es BFF",
    meta: "la jaula se ha vuelto pajaro",
    surface: true,
    versos: [
      "la herramienta del amo, en manos comunitarias, deja de ser del amo.",
      "",
      "[la brecha]",
      "reconoce la [[contingencia histórica|iii1|eco]] y acepta",
      "comprende la [[relatividad temporal|iii8|bucle]] para transmutar",
      "une el mundo dividido para acercar",
      "",
      "[la aliada que la cierra]",
      "desarrolla la capacidad predictiva para anticipar",
      "brinda una [[alternativa real|iii10|fuga]] para vivir",
      "nutre la inteligencia igualitaria al festejar",
      "",
      "[apropiarse de la herramienta]",
      "despierta el [[conocimiento dormido|iii11|fuga]] al transgredir",
      "empodera la [[invención futura|iii12|fuga]] al [[girar|iii4|bucle]]",
      "lleva el poder imaginativo para reinventar",
      "",
      "[tejer comunidad con la máquina]",
      "percibe el [[tejido social|iii9|eco]] que sostiene",
      "entrelaza una [[memoria larga|iii3|eco]] al unir",
      "forma una red subalterna que sobrevive",
      "",
      "[la utopía ya accesible]",
      "construye una [[utopía liberal|iii5|eco]] para convivir",
      "desea una [[sociedad libre|iii6|bucle]] que elimine",
      "reivindica la inteligencia igualitaria para enseñar",
      "",
      "[la grieta habitable]",
      "inventa el [[futuro andino|iii7|fuga]] para transformar",
      "tolera la [[disonancia cognitiva|iii2|bucle]] cuando avanza",
      "lleva el poder imaginativo [[hacia el ayni|fuga|fuga]]"
    ]
  },
  iii1: { titulo: "🜂 contingencia histórica", versos: [
    "reconoce la contingencia histórica y acepta",
    "afirma la contingencia última que define",
    "admite el azar biográfico y construye",
    "recupera la [[matriz andina|i1|eco]] al pensar" ] },
  iii2: { titulo: "∞ disonancia cognitiva", versos: [
    "tolera la disonancia cognitiva cuando avanza",
    "mantiene una actitud abierta para explorar",
    "combate el prejuicio arraigado para expandir",
    "sufre la misma [[disonancia|ii8|eco]] cuando avanza" ] },
  iii3: { titulo: "🜂 memoria larga", versos: [
    "entrelaza una memoria larga al unir",
    "reactualiza el mito ancestral al relatar",
    "conecta el linaje ancestral al resonar",
    "recupera la [[memoria|i4|eco]] que despierta" ] },
  iii4: { titulo: "∞ girar", versos: [
    "empodera la invención futura al girar",
    "desarticula la estructura racional al imaginar",
    "escapa del orden racional al transgredir",
    "propicia el ejercicio intuitivo [[para conectar|iii|bucle]]" ] },
  iii5: { titulo: "🜂 utopía liberal", versos: [
    "construye una utopía liberal para convivir",
    "construye una ecología plural para convivir",
    "brinda una alternativa real para vivir",
    "hereda la misma [[utopía|ii3|eco]] que permite" ] },
  iii6: { titulo: "∞ sociedad libre", versos: [
    "desea una sociedad libre que elimine",
    "construye una ecología plural para convivir",
    "reivindica la inteligencia igualitaria al enseñar",
    "altera el orden patriarcal [[al participar|iii|bucle]]" ] },
  iii7: { titulo: "✺ futuro andino", versos: [
    "inventa el futuro andino para transformar",
    "comprende la relatividad temporal para transmutar",
    "empodera la invención futura al girar",
    "lleva el poder imaginativo [[hacia el ayni|fuga|fuga]]" ] },
  iii8: { titulo: "∞ relatividad temporal", versos: [
    "comprende la relatividad temporal para transmutar",
    "concibe el tiempo cíclico para conocer",
    "contempla la región pasada para vislumbrar",
    "llega a la otra dimensión [[al cruzar|iii|bucle]]" ] },
  iii9: { titulo: "🜂 tejido social", versos: [
    "percibe el tejido social que sostiene",
    "establece una conexión contingente que vincula",
    "forma una red subalterna que sobrevive",
    "recupera la [[red subalterna|i5|eco]] que sobrevive" ] },
  iii10: { titulo: "✺ alternativa real", versos: [
    "brinda una alternativa real para vivir",
    "hace del arte medio para inventar",
    "une el mundo dividido para acercar",
    "escapa del orden racional [[al transgredir|fuga|fuga]]" ] },
  iii11: { titulo: "✺ conocimiento dormido", versos: [
    "despierta el conocimiento dormido al transgredir",
    "llama el espíritu centenario al tocar",
    "advierte el mensaje ancestral al imaginar",
    "traduce la voz sagrada [[al escuchar|fuga|fuga]]" ] },
  iii12: { titulo: "✺ invención futura", versos: [
    "empodera la invención futura al girar",
    "crea la obra futurista al unir",
    "rescata la temporalidad perdida al crear",
    "lleva el poder imaginativo [[hacia el ayni|fuga|fuga]]" ] },

  /* ========================= FUGA / AYNI ===================== */
  fuga: {
    titulo: "✺ fuga · ayni",
    special: "fuga",
    versos: [
      "aquí el algoritmo calla.",
      "lo único que no se compila",
      "es el dar sin esperar."
    ]
  },

  /* ========================= POEMA IV ======================== */
  iv: {
    titulo: "IV · estoicismo para baddies",
    meta: "manifiesto · sin enlaces · destilado de los pilares AWITA",
    surface: true,
    versos: [
      "[brújula]",
      "no explota la vida ajena para crecer",
      "empodera al pequeño en vez del grande",
      "ocupa el sistema desde adentro",
      "—mujer, indígena, neurodivergente— y manda",
      "",
      "[software]",
      "le resta agencia al caos que no controla",
      "le suma agencia a todo lo que sí",
      "no deja que el ruido externo nuble el presente",
      "sobrevive primero, impacta después",
      "",
      "[herramientas]",
      "libera al creativo de lo operativo",
      "automatiza lo que esclaviza",
      "vuelve la riqueza accesible, sostenible",
      "para los muchos, no para los ricos de siempre",
      "",
      "[camino]",
      "teje redes que ganan cuando todos ganan",
      "hace de la riqueza una virtud",
      "fija el propósito donde lo útil y lo gozoso se tocan",
      "porque su alma es grande y le pide comunidad"
    ]
  },

  /* ========================= EL MAPA DEL TESORO ===================== */
  mapa: {
    titulo: "root_directory :: manifiesto.exe",
    special: "mapa",
    versos: [
      "[pilar_01: brújula]",
      "import { ecosistema, feminismo, ayni };",
      "variable_protegida = \"vida_biológica\";",
      "if (sistema == explotador) { inyectar_código(desde_adentro); }",
      "empoderar(nodo_pequeño) > enriquecer(nodo_gigante);",
      "",
      "[pilar_02: software]",
      "import { estoicismo_pragmático };",
      "while (caos_externo == true) { bloquear_hilos(); mantener_presente(); }",
      "agencia_ajena.set(0);",
      "agencia_propia.set(MAX);",
      "// protocolo_baja_dopamina: sobrevivir_primero();",
      "",
      "[pilar_03: herramientas]",
      "automatizar(tareas_esclavas.exe);",
      "memoria_liberada = generar_valor_creativo();",
      "riqueza.distribuir(modo = accesible, alcance = nodos_subalternos);",
      "exit(carrera_de_la_rata);",
      "",
      "[pilar_04: camino]",
      "sincronizar_red(ganar_ganar);",
      "ikigai.mount({ util_para_otros: true, gozoso_para_mi: true });",
      "magnificencia_aristotelica = true;",
      "vincular(alma_individual, red_comunitaria);"
    ]
  }
};

/* Orden y etiqueta de los 4 hologramas / índice (títulos ASCII para el 3D) */
window.POEMAS_INDEX = [
  { id: "i",   n: "01", label: "brújula.rota",            holo: "brujula.rota" },
  { id: "ii",  n: "02", label: "robé el stack del amo",   holo: "robe el stack del amo" },
  { id: "iii", n: "03", label: "la IA es BFF",            holo: "la IA es BFF" },
  { id: "iv",  n: "04", label: "estoicismo para baddies", holo: "estoicismo para baddies" }
];
