const goBtn = document.getElementById('goBtn');

// const dnaSeq =
//   'GTGGACACGTACGCGGGTGCTTACGACCGTCAGTCGCGCGAGCGCGAGAATTCGAGCGCAGCAAGCCCAGCGACACAGCGTAGCGCCAACGAAGACAAGGCGGCCGACCTTCAGCGCGAAGTCGAGCGCGACGGGGGCCGGTTCAGGTTCGTCGGGCATTTCAGCGAAGCGCCGGGCACGTCGGCGTTCGGGACGGCGGAGCGCCCGGAGTTCGAACGCATCCTGAACGAATGCCGCGCCGGGCGGCTCAACATGATCATTGTCTATGACGTGTCGCGCTTCTCGCGCCTGAAGGTCATGGACGCGATTCCGATTGTCTCGGAATTGCTCGCCCTGGGCGTGACGATTGTTTCCACTCAGGAAGGCGTCTTCCGGCAGGGAAACGTCATGGACCTGATTCACCTGATTATGCGGCTCGACGCGTCGCACAAAGAATCTTCGCTGAAGTCGGCGAAGATTCTCGACACGAAGAACCTTCAGCGCGAATTGGGCGGGTACGTCGGCGGGAAGGCGCCTTACGGCTTCGAGCTTGTTTCGGAGACGAAGGAGATCACGCGCAACGGCCGAATGGTCAATGTCGTCATCAACAAGCTTGCGCACTCGACCACTCCCCTTACCGGACCCTTCGAGTTCGAGCCCGACGTAATCCGGTGGTGGTGGCGTGAGATCAAGACGCACAAACACCTTCCCTTCAAGCCGGGCAGTCAAGCCGCCATTCACCCGGGCAGCATCACGGGGCTTTGTAAGCGCATGGACGCTGACGCCGTGCCGACCCGGGGCGAGACGATTGGGAAGAAGACCGCTTCAAGCGCCTGGGACCCGGCAACCGTTATGCGAATCCTTCGGGACCCGCGTATTGCGGGCTTCGCCGCTGAGGTGATCTACAAGAAGAAGCCGGACGGCACGCCGACCACGAAGATTGAGGGTTACCGCATTCAGCGCGACCCGATCACGCTCCGGCCGGTCGAGCTTGATTGCGGACCGATCATCGAGCCCGCTGAGTGGTATGAGCTTCAGGCGTGGTTGGACGGCAGGGGGCGCGGCAAGGGGCTTTCCCGGGGGCAAGCCATTCTGTCCGCCATGGACAAGCTGTACTGCGAGTGTGGCGCCGTCATGACTTCGAAGCGCGGGGAAGAATCGATCAAGGACTCTTACCGCTGCCGTCGCCGGAAGGTGGTCGACCCGTCCGCACCTGGGCAGCACGAAGGCACGTGCAACGTCAGCATGGCGGCACTCGACAAGTTCGTTGCGGAACGCATCTTCAACAAGATCAGGCACGCCGAAGGCGACGAAGAGACGTTGGCGCTTCTGTGGGAAGCCGCCCGACGCTTCGGCAAGCTCACTGAGGCGCCTGAGAAGAGCGGCGAACGGGCGAACCTTGTTGCGGAGCGCGCCGACGCCCTGAACGCCCTTGAAGAGCTGTACGAAGACCGCGCGGCAGGCGCGTACGACGGACCCGTTGGCAGGAAGCACTTCCGGAAGCAACAGGCAGCGCTGACGCTCCGGCAGCAAGGGGCGGAAGAGCGGCTTGCCGAACTTGAAGCCGCCGAAGCCCCGAAGCTTCCCCTTGACCAATGGTTCCCCGAAGACGCCGACGCTGACCCGACCGGCCCTAAGTCGTGGTGGGGGCGCGCGTCAGTAGACGACAAGCGCGTGTTCGTCGGGCTCTTCGTAGACAAGATCGTTGTCACGAAGTCGACTACGGGCAGGGGGCAGGGAACGCCCATCGAGAAGCGCGCTTCGATCACGTGGGCGAAGCCGCCGACCGACGACGACGAAGACGACGCCCAGGACGGCACGGAAGACGTAGCGGCGTAG';
const findPrimer = (seq) => {
  let startBP = 0;
  let thresholdBP = 18 + startBP;
  let prePrimer = seq.trim().slice(startBP, thresholdBP);
  while (thresholdBP < seq.length && prePrimer.length <= 21) {
    if (
      prePrimer[prePrimer.length - 1] === 'C' ||
      prePrimer[prePrimer.length - 1] === 'G'
    ) {
      const primer = complement(prePrimer);
      const [Tm, GCcontent] = calcTmGC(primer);

      console.log(
        `3'-${primer}-5' : ${primer.length}bp ${startBP} :: ${thresholdBP}`
      );
      console.log(`Tm: ${Tm}±1°C, GC content: ${GCcontent}±1%`);

      showPrimers(primer, startBP, thresholdBP, Tm, GCcontent);
      break; // Вийти з циклу, коли умова виконана
    } else {
      thresholdBP++;
      prePrimer = seq.slice(startBP, thresholdBP);
      startBP++;
    }
  }
};

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
const reverseSeq = (seq) => {
  const preReversedSeq = Array.from(seq);
  const reversedSeq = preReversedSeq.reverse().join('');
  return reversedSeq;
};
const complement = (seq) => {
  const complementMap = {
    A: 'T',
    T: 'A',
    C: 'G',
    G: 'C',
  };
  const complementSeq = Array.from(seq)
    .map((nucleotide) => complementMap[nucleotide])
    .join('');
  return complementSeq;
};
const showPrimers = (primerSeq, startPoint, finishPoint, Tm, GCcontent) => {
  const placeholder = document.getElementById('primer-maker_results');
  const primerDIV = document.createElement('div');
  // ********************************************************
  const primerInfo = `3'-${primerSeq}-5' : ${primerSeq.length}bp ${startPoint} :: ${finishPoint}`;
  const primerFeatures = `Tm: ${Tm}±1°C, GC content: ${GCcontent}±1%`;
  // ********************************************************

  primerDIV.innerHTML = `<h2>${primerInfo}</h2> \n ${primerFeatures}`;

  placeholder.appendChild(primerDIV);
};

goBtn.addEventListener('click', () => {
  const seqDNA = document.getElementById('DNAseq').value;
  findPrimer(seqDNA);
});
