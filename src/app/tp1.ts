
/***********************************************************************************************************************
 * Fonction qui renvoie le minimum de deux nombres
 */
export function min(a: number, b: number): number {
    return a < b ? a : b;
}


/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre croissant
 */
export function triCroissant(L: readonly number[]): number[] {
    return [...L].sort(
        (a, b) => a - b
    );
}


/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre décroissant
 */
export function triDécroissant(L: readonly number[]): number[] {
    return triCroissant(L).reverse();
}


/***********************************************************************************************************************
 * Fonction qui somme.
 * Lève une erreur "Impossible de sommer un tableau vide" si le tableau est vide
 * Lever l'erreur à l'aide de throw new Error( ....... )
 */
export function Somme(L: readonly number[]): number {
    if (L.length === 0)
        throw new Error("Impossible de sommer un tableau vide")
    return L.reduce( (somme, x) => somme + x);
}


/***********************************************************************************************************************
 * Fonction qui fait la moyenne
 * Lève une erreur "Impossible de faire la moyenne d'un tableau vide" si le tableau est vide
 * Lever l'erreur à l'aide de throw new Error( ....... )
 */
export function Moyenne(L: readonly number[]): number {
    if (L.length === 0)
        throw new Error("Impossible de faire la moyenne d'un tableau vide")
    return Somme(L) / L.length;
}


/***********************************************************************************************************************
 * Fonction qui renvoie les nombres strictement supérieurs à un certain seuil
 * et triés par ordre croissant
 */
export function NombresSupérieursA(min: number, notes: readonly number[]): number[] {
    return triCroissant(
        notes.filter(x => x > min) // Les éléments de notes qui sont < à min
    );
}


/***********************************************************************************************************************
 * Fonction qui renvoie les nombres compris entre une valeur minimale et une valeur maximale
 * (valeurs non inclues) et triés par ordre croissant
 */
export function NombresComprisEntre(min: number, max: number, notes: readonly number[]): number[] {
    return triCroissant(
        notes.filter( note => note > min && note < max )
    );
}


/***********************************************************************************************************************
 * Coder la méthode zip
 * Voir https://en.wikipedia.org/wiki/Zipping_(computer_science)#Definition
 */
type ZipArgs<R extends unknown[]> = {
    [P in keyof R]: readonly R[P][];
}
type ZipResult<R extends unknown[]> = readonly R[];

export function Zip<R extends unknown[]>(...LL: ZipArgs<R>): ZipResult<R> {
    // La liste de longueur minimum, ou [] si LL ets vide.
    const Lmin = LL.length == 0 ? [] : LL.reduce(
        (Lm, L) => Lm.length < L.length ? Lm : L
    )

    // On renvoie un tableau de tuples, la taille de ce tableau est la même que Lmin, d'où le map sur Lmin.
    // Chaque tuple contient Les éléments des tableaux de LL aux indices i.
    // Chaque tuple est donc construit à partir d'un map de LL.
    // Enfin, on doit procéder à une assertion de type (as ...) 
    //    car la méthode map sur les tableau renvoie un tableau
    //    or ici on veut affirmer que ce tableau est un tuple de type R, 
    //    c'est à dire du même type que les élément de R (type ZipResult<R>[number])
    return Lmin.map( (_, i) => LL.map( L => L[i] ) as ZipResult<R>[number] ); 
}

const toto = Zip([1, 2], [true, false], ["coucou"])

/***********************************************************************************************************************
 * Produit scalaire entre deux vecteurs
 * Lève une erreur "Les vecteurs doivent être non vides" si l'un des deux vecteurs est vide
 * Lève une erreur "Les vecteurs doivent être de même taille" si les deux vecteurs n'ont pas la même taille
 * Lever l'erreur à l'aide de throw new Error( ....... )
 */
export function ProduitScalaire(V1: readonly number[], V2: readonly number[]): number {
    return NaN;
}


/***********************************************************************************************************************
 * Addition de matrices
 *   - définir le type ScalarMatrix comme un tableau immuable de tableaux immuables de nombres
 *   - Ajouter les deux matrices M1 et M2 si c'est possible et renvoyer le résultat {success: true, result: ScalarMatrix}
 *   - sinon renvoyer le résultat {success: false, error: XXX}, où vous définissez le type XXX le plus précisément possible, 
 *     avec les erreur à renvoyer dans cette ordre de priorité :
 *      - "M1 n'est pas bien formée"  -> dans le cas où M1 n'est pas rectangulaire
 *      - "M2 n'est pas bien formée"  -> dans le cas où M2 n'est pas rectangulaire
 *      - "M1 ne peut pas être vide"  -> La matrice M1 est vide (0 ligne u 0 colonne)
 *      - "M2 ne peut pas être vide"  -> La matrice M2 est vide (0 ligne u 0 colonne)
 *      - "Les matrices doivent avoir la même taille"  -> La matrice est vide (0 lignes u 0 colonnes)
 */
type ScalarMatrix = unknown; // à redéfinir
type AjoutResult  = unknown; // à redéfinir

export function AjoutMatrices(M1: ScalarMatrix, M2: ScalarMatrix): AjoutResult {
    return undefined;
}

/**
 * Codez une fonction qui somme une liste de matrices (au moins 2)
 * Adaptez le code de la fonction AjoutMatrices ainsi que les codes erreurs
 */



/**
 * Codez une classe immuable Matrice implémentant l'ajout et la multiplication de matrices.
 */
