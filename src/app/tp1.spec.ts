import { AjoutMatrices, Moyenne, NombresComprisEntre, NombresSupérieursA, ProduitScalaire, Somme, Zip, min, triCroissant, triDécroissant } from "./tp1";

type TestUnit<T extends (...args: any) => any> = TestOK<T> | TestNOK<T>;
interface TestOK<T extends (...args: any) => any> {
    readonly args: Parameters<T>, 
    readonly expectedResult: ReturnType<T>, 
}

interface TestNOK<T extends (...args: any) => any> {
    readonly args: Parameters<T>, 
    readonly errorExpected: string
}

interface TestTP<T extends (...args: any) => any> {
    readonly f: T;
    readonly tests: readonly TestUnit<T>[];
}

type fToTest<LT extends ((...args: any) => any)[]> = {
    [P in keyof LT]: TestTP<LT[P]>
}

function processTests<LT extends ((...args: any) => any)[]>(...L: fToTest<LT>) {
    for (const f of L) {
        describe(f.f.name, () => {
            for (const t of f.tests) {
                let msg = `${f.f.name}(${t.args.map((a: any) => JSON.stringify(a)).join(", ")})`;
                const tNOK = t as TestNOK<typeof f.f>;
                msg += (tNOK.errorExpected !== undefined) ? ` throws ${tNOK.errorExpected}` : ` returns ${JSON.stringify((t as TestOK<typeof f.f>).expectedResult)}`;
                it(msg, () => {
                    
                    if (tNOK.errorExpected !== undefined) {
                        expect(() => f.f(...t.args)).toThrowError(tNOK.errorExpected);
                    } else {
                        const tOK = t as TestOK<typeof f.f>;
                        expect(f.f(...t.args)).toEqual(tOK.expectedResult);
                    }
                });
            }
        });
    }
}

processTests(
    {
        f: min,
        tests: [
            {args: [17, 27], expectedResult: 17},
            {args: [17, 15], expectedResult: 15},
            {args: [4, 4], expectedResult: 4},
        ]
    },
    {
        f: triCroissant,
        tests: [
            {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [-38, -21, -6, 16, 44, 51, 59, 63, 64, 95]},
            {args: [[23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: [-98, -60, -52, -40, -23, -12, -4, 23, 29, 40]},
            {args: [[]], expectedResult: []}
        ]        
    },
    {
        f: triDécroissant,
        tests: [
            {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [95, 64, 63, 59, 51, 44, 16, -6, -21, -38]},
            {args: [[23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: [40, 29, 23, -4, -12, -23, -40, -52, -60, -98]},
            {args: [[10]], expectedResult: [10]},
            {args: [[]], expectedResult: []}
        ]        
    },
    {
        f: Somme,
        tests: [
            {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: 327},
            {args: [[23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: -197},
            {args: [[10]], expectedResult: 10},
            {args: [[]], errorExpected: "Impossible de sommer un tableau vide"}

        ]
    },
    {
        f: Moyenne,
        tests: [
            {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: 32.7},
            {args: [[23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: -19.7},
            {args: [[10]], expectedResult: 10},
            {args: [[]], errorExpected: "Impossible de faire la moyenne d'un tableau vide"}
        ]        
    },
    {
        f: NombresSupérieursA,
        tests: [
            {args: [10, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16, 44, 51, 59, 63, 64, 95]},
            {args: [20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [44, 51, 59, 63, 64, 95]},
            {args: [50, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [51, 59, 63, 64, 95]},
            {args: [50, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
            {args: [10, []], expectedResult: []}
        ]        
    },
    {
        f: NombresComprisEntre,
        tests: [
            {args: [10, 20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16]},
            {args: [0, 100, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16, 44, 51, 59, 63, 64, 95]},
            {args: [10, 20, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
            {args: [10, 20, []], expectedResult: []}        
        ]
    },
    {
        f: Zip,
        tests: [
            {args: [  ], expectedResult: []},
            {args: [ [1, 2, 3], ['a', 'b', 'c'] ], expectedResult: [[1, 'a'], [2, 'b'], [3, 'c']]},
            {args: [ [1, 2, 3], ['a', 'b', 'c'], [true, false, false] ], expectedResult: [[1, 'a', true], [2, 'b', false], [3, 'c', false]]},
            {args: [ [1], ['a', 'b', 'c'], [true, false, false] ], expectedResult: [[1, 'a', true]]},
            {args: [ [1, 2, 3], ['a', 'b', 'c'], ['x', 'y', 'z'], [true, false, true]], expectedResult: [[1, 'a', 'x', true], [2, 'b', 'y', false], [3, 'c', 'z', true]]},
        ]
    },
    {
        f: ProduitScalaire,
        tests: [
            {args: [[1, 1], [1, 1]], expectedResult: 2},
            {args: [[4, 1], [1, 3]], expectedResult: 7},
            {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44], [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]],
                expectedResult: -49},
            {args: [[], [5]], errorExpected: "Les vecteurs doivent être non vides"},
            {args: [[5], []], errorExpected: "Les vecteurs doivent être non vides"},
            {args: [[2, 3], [4]], errorExpected: "Les vecteurs doivent être de même taille"}
        ]
    }, 
    {
        f: AjoutMatrices,
        tests: [
            {args: [ [[1, 1], [1, 1]], [[1, 0], [0, 1]] ], expectedResult: {success: true, result: [[2, 1], [1, 2]]} },
            {args: [ [[1, 1], [1, 1]], [[1, 4], [0, 1]] ], expectedResult: {success: true, result: [[2, 5], [1, 2]]} },
            {args: [ [[1, 1], [1, 1], [1, 3]], [[1, -4], [0, 1], [65, -54]] ], expectedResult: {success: true, result: [[2, -3], [1, 2], [66, -51]]} },
            {args: [ [[1, 1], [1, 1]], [] ], expectedResult: {success: false, error: "M2 ne peut pas être vide"} },
            {args: [ [[1, 1], [1, 1]], [[]] ], expectedResult: {success: false, error: "M2 ne peut pas être vide"} },
            {args: [ [], [[1, 1], [1, 1]]], expectedResult: {success: false, error: "M1 ne peut pas être vide"} },
            {args: [ [[]], [[1, 1], [1, 1]]], expectedResult: {success: false, error: "M1 ne peut pas être vide"} },
            {args: [ [[1, 1], [1, 1]], [[5]] ], expectedResult: {success: false, error: "Les matrices doivent avoir la même taille"} },
            {args: [ [[5]], [[1, 1], [1, 1]] ], expectedResult: {success: false, error: "Les matrices doivent avoir la même taille"} },
            {args: [ [[1, 1], [1, 1]], [[], []] ], expectedResult: {success: false, error: "M2 ne peut pas être vide"} },
            {args: [ [[], []], [[1, 1], [1, 1]] ], expectedResult: {success: false, error: "M1 ne peut pas être vide"}},
            {args: [[], [[5]]], expectedResult: {success: false, error: "M1 ne peut pas être vide"} },
            {args: [ [[1], []], [[1, 1], [1, 1]] ], expectedResult: {success: false, error: "M1 n'est pas bien formée"}},
            {args: [ [[], []], [[1, 1, 1], [1, 1]] ], expectedResult: {success: false, error: "M2 n'est pas bien formée"}},
        ]
    }
);
