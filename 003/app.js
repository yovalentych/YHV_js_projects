const dnaSeq =
  'AAAAAAAAAAAAAACAAAAAAAATTGCCAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG';
const findPrimer = (seq) => {
  let startBP = 0;
  let thresholdBP = 18 + startBP;
  let prePrimer = seq.slice(startBP, thresholdBP);

  while (thresholdBP < seq.length && prePrimer.length <= 21) {
    if (
      prePrimer[prePrimer.length - 1] === 'C' ||
      prePrimer[prePrimer.length - 1] === 'G'
    ) {
      const [Tm, GCcontent] = calcTmGC(prePrimer);
      console.log(
        `3'-${prePrimer}-5' : ${prePrimer.length}bp ${startBP} :: ${thresholdBP}`
      );
      console.log(`Tm: ${Tm}±1°C, GC content: ${GCcontent}±1%`);
      break; // Вийти з циклу, коли умова виконана
    } else {
      thresholdBP++;
      prePrimer = seq.slice(startBP, thresholdBP);
      startBP++;
    }
  }
};

findPrimer(dnaSeq);

function calcTmGC(seq) {
  let AT = 0;
  let GC = 0;
  let Tm = 0;
  let GCcontent = 0;
  for (let i = 0; i < seq.length; i++) {
    if (seq[i] === 'A' || seq[i] === 'T') {
      AT++;
    } else if (seq[i] === 'G' || seq[i] === 'C') {
      GC++;
    }
  }
  Tm = AT * 2 + GC * 4;
  GCcontent = Math.floor((GC / seq.length) * 100);
  return [Tm, GCcontent];
}
