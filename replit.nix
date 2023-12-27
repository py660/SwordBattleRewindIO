{ pkgs }: {
  deps = [
    pkgs.postgresql_14
    pkgs.wget
    pkgs.nodejs-16_x
  ];
}