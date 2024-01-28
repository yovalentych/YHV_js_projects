class Primer {
  constructor(primerSeq, primerLength, cgContent, tMelt, isGClastBP) {
    this.primerSeq = primerSeq;
    this.primerLength = primerLength;
    this.cgContent = cgContent;
    this.tMelt = tMelt;
    this.isGClastBP = isGClastBP;
  }
}
const dnaSeq =
  'GTGGACACGTACGCGGGTGCTTACGACCGTCAGTCGCGCGAGCGCGAGAATTCGAGCGCAGCAAGCCCAGCGACACAGCGTAGCGCCAACGAAGACAAGGCGGCCGACCTTCAGCGCGAAGTCGAGCGCGACGGGGGCCGGTTCAGGTTCGTCGGGCATTTCAGCGAAGCGCCGGGCACGTCGGCGTTCGGGACGGCGGAGCGCCCGGAGTTCGAACGCATCCTGAACGAATGCCGCGCC';
class fwdPrimer extends Primer {
  constructor(primerSeq, primerLength, cgContent, tMelt, isGClastBP) {
    super(primerSeq, primerLength, cgContent, tMelt, isGClastBP);
  }
}

console.log(fwdPrimer.primerSeq);
