var changes = 1;

index = function () {
    var imgs = [
        (src =
            "https://hanoicomputercdn.com/media/banner/21_Aug1dcf11209bfa33afcaa166a65d56a198.png"),
        (src =
            "https://hanoicomputercdn.com/media/banner/21_Auge822306b9aba441eea5d5ffc3662b0bc.png"),
        (src =
            "https://hanoicomputercdn.com/media/banner/30_Augf48b41c1899387b4594cdfb770f0b160.png"),
        (src =
            "https://hanoicomputercdn.com/media/banner/20_Sep8cb52c67fef81d09a427a24e865707d1.jpg"),
        (src =
            "https://hanoicomputercdn.com/media/banner/20_Sepe1db25b037b1c17231ff5f63c4122724.jpg"),



    ];
    document.getElementById("img1").src = imgs[changes];
    changes++;
    if (changes == 5) {
        changes = 0;
    }
};
setInterval(index, 2500);