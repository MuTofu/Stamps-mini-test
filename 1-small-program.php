<?php

/**
 * Mengecek apakah sebuah bilangan adalah bilangan prima.
 *
 * Bilangan prima adalah bilangan > 1 yang hanya habis dibagi 1 dan dirinya sendiri.
 * Pembagi cukup dicek sampai akar kuadrat dari n: jika n = a × b, salah satu
 * dari a atau b pasti ≤ √n. Jadi kalau tidak ada pembagi sampai √n, n pasti prima.
 *
 * @param int $n
 * @return bool
 */
function isPrime(int $n): bool {
    if ($n < 2) return false;

    for ($i = 2; $i * $i <= $n; $i++) {
        if ($n % $i === 0) return false;
    }

    return true;
}

$result = [];

foreach (range(100, 1) as $n) {
    if (isPrime($n)) continue;

    // 15 dicek lebih dulu karena kelipatan 15 juga kelipatan 3 dan 5.
    // Jika 3 dicek duluan, angka seperti 90 akan menjadi "Foo", bukan "FooBar".
    if ($n % 15 === 0) $result[] = "FooBar";
    elseif ($n % 3 === 0) $result[] = "Foo";
    elseif ($n % 5 === 0) $result[] = "Bar";
    else $result[] = $n;
}

echo implode(", ", $result);
