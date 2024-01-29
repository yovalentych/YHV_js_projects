const goBtn = document.getElementById('goBtn');

// const dnaSeq =
//   'GTGGACACGTACGCGGGTGCTTACGACCGTCAGTCGCGCGAGCGCGAGAATTCGAGCGCAGCAAGCCCAGCGACACAGCGTAGCGCCAACGAAGACAAGGCGGCCGACCTTCAGCGCGAAGTCGAGCGCGACGGGGGCCGGTTCAGGTTCGTCGGGCATTTCAGCGAAGCGCCGGGCACGTCGGCGTTCGGGACGGCGGAGCGCCCGGAGTTCGAACGCATCCTGAACGAATGCCGCGCCGGGCGGCTCAACATGATCATTGTCTATGACGTGTCGCGCTTCTCGCGCCTGAAGGTCATGGACGCGATTCCGATTGTCTCGGAATTGCTCGCCCTGGGCGTGACGATTGTTTCCACTCAGGAAGGCGTCTTCCGGCAGGGAAACGTCATGGACCTGATTCACCTGATTATGCGGCTCGACGCGTCGCACAAAGAATCTTCGCTGAAGTCGGCGAAGATTCTCGACACGAAGAACCTTCAGCGCGAATTGGGCGGGTACGTCGGCGGGAAGGCGCCTTACGGCTTCGAGCTTGTTTCGGAGACGAAGGAGATCACGCGCAACGGCCGAATGGTCAATGTCGTCATCAACAAGCTTGCGCACTCGACCACTCCCCTTACCGGACCCTTCGAGTTCGAGCCCGACGTAATCCGGTGGTGGTGGCGTGAGATCAAGACGCACAAACACCTTCCCTTCAAGCCGGGCAGTCAAGCCGCCATTCACCCGGGCAGCATCACGGGGCTTTGTAAGCGCATGGACGCTGACGCCGTGCCGACCCGGGGCGAGACGATTGGGAAGAAGACCGCTTCAAGCGCCTGGGACCCGGCAACCGTTATGCGAATCCTTCGGGACCCGCGTATTGCGGGCTTCGCCGCTGAGGTGATCTACAAGAAGAAGCCGGACGGCACGCCGACCACGAAGATTGAGGGTTACCGCATTCAGCGCGACCCGATCACGCTCCGGCCGGTCGAGCTTGATTGCGGACCGATCATCGAGCCCGCTGAGTGGTATGAGCTTCAGGCGTGGTTGGACGGCAGGGGGCGCGGCAAGGGGCTTTCCCGGGGGCAAGCCATTCTGTCCGCCATGGACAAGCTGTACTGCGAGTGTGGCGCCGTCATGACTTCGAAGCGCGGGGAAGAATCGATCAAGGACTCTTACCGCTGCCGTCGCCGGAAGGTGGTCGACCCGTCCGCACCTGGGCAGCACGAAGGCACGTGCAACGTCAGCATGGCGGCACTCGACAAGTTCGTTGCGGAACGCATCTTCAACAAGATCAGGCACGCCGAAGGCGACGAAGAGACGTTGGCGCTTCTGTGGGAAGCCGCCCGACGCTTCGGCAAGCTCACTGAGGCGCCTGAGAAGAGCGGCGAACGGGCGAACCTTGTTGCGGAGCGCGCCGACGCCCTGAACGCCCTTGAAGAGCTGTACGAAGACCGCGCGGCAGGCGCGTACGACGGACCCGTTGGCAGGAAGCACTTCCGGAAGCAACAGGCAGCGCTGACGCTCCGGCAGCAAGGGGCGGAAGAGCGGCTTGCCGAACTTGAAGCCGCCGAAGCCCCGAAGCTTCCCCTTGACCAATGGTTCCCCGAAGACGCCGACGCTGACCCGACCGGCCCTAAGTCGTGGTGGGGGCGCGCGTCAGTAGACGACAAGCGCGTGTTCGTCGGGCTCTTCGTAGACAAGATCGTTGTCACGAAGTCGACTACGGGCAGGGGGCAGGGAACGCCCATCGAGAAGCGCGCTTCGATCACGTGGGCGAAGCCGCCGACCGACGACGACGAAGACGACGCCCAGGACGGCACGGAAGACGTAGCGGCGTAG';
const findPrimerSite = (seq) => {
  let startBP = 0;
  let thresholdBP = 18 + startBP;
  let prePrimerSite = seq.trim().slice(startBP, thresholdBP);
  while (thresholdBP < seq.length && prePrimerSite.length <= 21) {
    if (
      prePrimerSite[prePrimerSite.length - 1] === 'C' ||
      prePrimerSite[prePrimerSite.length - 1] === 'G'
    ) {
      return [prePrimerSite, startBP, thresholdBP];
    } else {
      thresholdBP++;
      prePrimerSite = seq.slice(startBP, thresholdBP);
      startBP++;
    }
  }
};

const calcTmGC = (seq) => {
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
};
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
const showPrimers = (
  dir,
  primerSeq,
  startPoint,
  finishPoint,
  Tm,
  GCcontent
) => {
  const placeholder = document.getElementById('primer-maker_results');
  const primerDIV = document.createElement('div');
  // ********************************************************
  const primerInfo = `<h2>${dir}:</h2> 3'-${primerSeq}-5' : ${primerSeq.length}bp || ${startPoint} :: ${finishPoint}`;
  const primerFeatures = `Tm: ${Tm}±1°C, GC content: ${GCcontent}±1%`;
  // ********************************************************

  primerDIV.innerHTML = `<h2>${primerInfo}</h2> \n <h3>${primerFeatures}</h3>`;

  placeholder.appendChild(primerDIV);
};

const getForwardPrimer = (seq) => {
  const direction = 'FORWARD';
  const fwdPrimerSite = findPrimerSite(seq);
  const fwdPrimerSeq = complement(fwdPrimerSite[0]);
  const [Tmelt, CGpercentage] = calcTmGC(fwdPrimerSeq);
  showPrimers(
    direction,
    fwdPrimerSeq,
    fwdPrimerSite[1],
    fwdPrimerSite[2],
    Tmelt,
    CGpercentage
  );
};

const getReversedPrimer = (seq) => {
  const direction = 'REVERSE';
  const reversedSeq = reverseSeq(seq);
  const revPrimerSite = findPrimerSite(reversedSeq);
  const revPrimerSeq = complement(revPrimerSite[0]);
  const [Tmelt, CGpercentage] = calcTmGC(revPrimerSeq);
  showPrimers(
    direction,
    revPrimerSeq,
    revPrimerSite[1],
    revPrimerSite[2],
    Tmelt,
    CGpercentage
  );
};

const comparePrimers = (lengthF, lengthR, tmF, tmR, gcF, gcR) => {
  const length = Math.abs(lengthF - lengthR);
  const tm = Math.abs(tmF - tmR);
  const gc = Math.abs(gcF - gcR);
  if (length > 4 || tm > 5 || gc > 10) {
    console.log('Primer is nice');
  } else {
    console.log('Primers like a pice of shit');
  }
};

const primerMaker = (seq) => {
  if (!seq || seq.length < 45 || !/^[ATGC]+$/i.test(seq)) {
    alert(
      'Type the DNA sequence to find primers for PCR. \nDNA sequence must be longer than 45bp.\nDNA sequence contains A T C G only. '
    );
  } else {
    getForwardPrimer(seq);
    getReversedPrimer(seq);
  }
};

goBtn.addEventListener('click', () => {
  const seqDNA = document.getElementById('DNAseq').value;
  const pureSeq = seqDNA.trim().toUpperCase();
  primerMaker(pureSeq);
});
