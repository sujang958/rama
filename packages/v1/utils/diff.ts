/**
 * program: "patienceDiff" algorithm implemented in typescript.
 * author: Jonathan Trent
 * version: 2.0
 *
 * use:  patienceDiff( aLines: string[], bLines: string[], diffPlusFlag: boolean )
 *
 * where:
 *      aLines[] contains the original text lines.
 *      bLines[] contains the new text lines.
 *      diffPlusFlag if true, returns additional arrays with the subset of lines that were
 *          either deleted or inserted.  These additional arrays are used by patienceDiffPlus.
 *
 * returns an object with the following properties:
 *      lines[] with properties of:
 *          line containing the line of text from aLines or bLines.
 *          aIndex referencing the index in aLines[].
 *          bIndex referencing the index in bLines[].
 *              (Note:  The line is text from either aLines or bLines, with aIndex and bIndex
 *               referencing the original index. If aIndex === -1 then the line is new from bLines,
 *               and if bIndex === -1 then the line is old from aLines.)
 *      lineCountDeleted is the number of lines from aLines[] not appearing in bLines[].
 *      lineCountInserted is the number of lines from bLines[] not appearing in aLines[].
 *      lineCountMoved is 0. (Only set when using patienceDiffPlus.)
 *
 */

function patienceDiff(
  aLines: string[],
  bLines: string[],
  diffPlusFlag: boolean = false,
): {
  lines: {
    line: string
    aIndex: number
    bIndex: number
  }[]
  lineCountDeleted: number
  lineCountInserted: number
  aMove?: string[]
  aMoveIndex?: number[]
  bMove?: string[]
  bMoveIndex?: number[]
} {
  //
  // findUnique finds all unique values in arr[lo..hi], inclusive.  This
  // function is used in preparation for determining the longest common
  // subsequence.  Specifically, it first reduces the array range in question
  // to unique values.
  //
  // Returns an ordered Map, with the arr[i] value as the Map key and the
  // array index i as the Map value.
  //

  function findUnique(
    arr: string[],
    lo: number,
    hi: number,
  ): Map<string, number> {
    const lineMap = new Map<string, { count: number; index: number }>()

    for (let i = lo; i <= hi; i++) {
      let line = arr[i]

      const lineInMap = lineMap.get(line)

      if (lineInMap) {
        lineInMap.count++
        lineInMap.index = i
      } else {
        lineMap.set(line, {
          count: 1,
          index: i,
        })
      }
    }

    const indexMap = new Map<string, number>()

    lineMap.forEach((val, key) => {
      if (val.count === 1) indexMap.set(key, val.index)
    })

    return indexMap
  }

  //
  // uniqueCommon finds all the unique common entries between aArray[aLo..aHi]
  // and bArray[bLo..bHi], inclusive.  This function uses findUnique to pare
  // down the aArray and bArray ranges first, before then walking the comparison
  // between the two arrays.
  //
  // Returns an ordered Map, with the Map key as the common line between aArray
  // and bArray, with the Map value as an object containing the array indexes of
  // the matching unique lines.
  //

  function uniqueCommon(
    aArray: string[],
    aLo: number,
    aHi: number,
    bArray: string[],
    bLo: number,
    bHi: number,
  ) {
    const ma = findUnique(aArray, aLo, aHi)
    const mb = findUnique(bArray, bLo, bHi)

    const map = new Map<string, Record<string, any>>()

    ma.forEach((val, key) => {
      if (mb.has(key)) {
        map.set(key, {
          indexA: val,
          indexB: mb.get(key),
        })
      } else {
        map.delete(key)
      }
    })

    return map
  }

  //
  // longestCommonSubsequence takes an ordered Map from the function uniqueCommon
  // and determines the Longest Common Subsequence (LCS).
  //
  // Returns an ordered array of objects containing the array indexes of the
  // matching lines for a LCS.
  //

  function longestCommonSubsequence(
    abMap: Map<string, Record<string, any>>,
  ): Record<string, any>[] {
    const ja: Record<string, any>[][] = []

    // First, walk the list creating the jagged array.

    abMap.forEach((val, key, map) => {
      let i = 0

      while (ja[i] && ja[i][ja[i].length - 1].indexB < val.indexB) {
        i++
      }

      if (!ja[i]) ja[i] = []

      if (0 < i) val.prev = ja[i - 1][ja[i - 1].length - 1]

      ja[i].push(val)
    })

    // Now, pull out the longest common subsequence.

    let lcs: Record<string, any>[] = []

    if (0 < ja.length) {
      let n = ja.length - 1
      lcs = [ja[n][ja[n].length - 1]]

      while (lcs[lcs.length - 1].prev) {
        lcs.push(lcs[lcs.length - 1].prev)
      }
    }

    return lcs.toReversed()
  }

  // "result" is the array used to accumulate the aLines that are deleted, the
  // lines that are shared between aLines and bLines, and the bLines that were
  // inserted.

  const result: { line: string; aIndex: number; bIndex: number }[] = []
  let deleted = 0
  let inserted = 0

  // aMove and bMove will contain the lines that don't match, and will be returned
  // for possible searching of lines that moved.

  const aMove: string[] = []
  const aMoveIndex: number[] = []
  const bMove: string[] = []
  const bMoveIndex: number[] = []

  //
  // addToResult simply pushes the latest value onto the "result" array.  This
  // array captures the diff of the line, aIndex, and bIndex from the aLines
  // and bLines array.
  //

  function addToResult(aIndex: number, bIndex: number) {
    if (bIndex < 0) {
      aMove.push(aLines[aIndex])
      aMoveIndex.push(result.length)
      deleted++
    } else if (aIndex < 0) {
      bMove.push(bLines[bIndex])
      bMoveIndex.push(result.length)
      inserted++
    }

    result.push({
      line: 0 <= aIndex ? aLines[aIndex] : bLines[bIndex],
      aIndex: aIndex,
      bIndex: bIndex,
    })
  }

  //
  // addSubMatch handles the lines between a pair of entries in the LCS.  Thus,
  // this function might recursively call recurseLCS to further match the lines
  // between aLines and bLines.
  //

  function addSubMatch(aLo: number, aHi: number, bLo: number, bHi: number) {
    // Match any lines at the beginning of aLines and bLines.

    while (aLo <= aHi && bLo <= bHi && aLines[aLo] === bLines[bLo])
      addToResult(aLo++, bLo++)

    // Match any lines at the end of aLines and bLines, but don't place them
    // in the "result" array just yet, as the lines between these matches at
    // the beginning and the end need to be analyzed first.

    let aHiTemp = aHi

    while (aLo <= aHi && bLo <= bHi && aLines[aHi] === bLines[bHi]) {
      aHi--
      bHi--
    }

    // Now, check to determine with the remaining lines in the subsequence
    // whether there are any unique common lines between aLines and bLines.
    //
    // If not, add the subsequence to the result (all aLines having been
    // deleted, and all bLines having been inserted).
    //
    // If there are unique common lines between aLines and bLines, then let's
    // recursively perform the patience diff on the subsequence.

    const uniqueCommonMap = uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi)

    if (uniqueCommonMap.size === 0) {
      while (aLo <= aHi) addToResult(aLo++, -1)

      while (bLo <= bHi) addToResult(-1, bLo++)
    } else {
      recurseLCS(aLo, aHi, bLo, bHi, uniqueCommonMap)
    }

    // Finally, let's add the matches at the end to the result.

    while (aHi < aHiTemp) addToResult(++aHi, ++bHi)
  }

  //
  // recurseLCS finds the longest common subsequence (LCS) between the arrays
  // aLines[aLo..aHi] and bLines[bLo..bHi] inclusive.  Then for each subsequence
  // recursively performs another LCS search (via addSubMatch), until there are
  // none found, at which point the subsequence is dumped to the result.
  //

  function recurseLCS(
    aLo: number,
    aHi: number,
    bLo: number,
    bHi: number,
    uniqueCommonMap?: any,
  ) {
    const x = longestCommonSubsequence(
      uniqueCommonMap || uniqueCommon(aLines, aLo, aHi, bLines, bLo, bHi),
    )

    if (x.length === 0) {
      addSubMatch(aLo, aHi, bLo, bHi)
    } else {
      if (aLo < x[0].indexA || bLo < x[0].indexB)
        addSubMatch(aLo, x[0].indexA - 1, bLo, x[0].indexB - 1)

      let i
      for (i = 0; i < x.length - 1; i++)
        addSubMatch(
          x[i].indexA,
          x[i + 1].indexA - 1,
          x[i].indexB,
          x[i + 1].indexB - 1,
        )

      if (x[i].indexA <= aHi || x[i].indexB <= bHi)
        addSubMatch(x[i].indexA, aHi, x[i].indexB, bHi)
    }
  }

  recurseLCS(0, aLines.length - 1, 0, bLines.length - 1)

  if (diffPlusFlag)
    return {
      lines: result,
      lineCountDeleted: deleted,
      lineCountInserted: inserted,
      // lineCountMoved: 0,
      aMove: aMove,
      aMoveIndex: aMoveIndex,
      bMove: bMove,
      bMoveIndex: bMoveIndex,
    }

  return {
    lines: result,
    lineCountDeleted: deleted,
    lineCountInserted: inserted,
    // lineCountMoved: 0,
  }
}

// const prev = `dagagg
// asdf`

// const next = `sdfasdf
// dagagg
// asdf`

// console.log(patienceDiff(prev.split("\n"), next.split("\n")))
