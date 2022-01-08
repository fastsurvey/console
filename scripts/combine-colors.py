c1 = "DCEEFB"
c3 = "B6E0FE"


def hex_to_rgb(h):
    return [int(x, base=16) for x in [h[0:2], h[2:4], h[4:]]]


def rgb_to_hex(rgb):
    print(rgb)
    return "".join([str(hex(x))[2:].zfill(2) for x in rgb])


a1 = hex_to_rgb(c1)
a3 = hex_to_rgb(c3)

a2 = [int((x1 + x3) / 2) for x1, x3 in zip(a1, a3)]
c2 = rgb_to_hex(a2)
print(c2)
