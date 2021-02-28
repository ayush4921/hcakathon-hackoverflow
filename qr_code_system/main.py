import qrcode
import uuid


def makeqrcodes(numberofitems, variable_to_add):
    uidlist = []
    while len(uidlist) < numberofitems:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=4,
        )
        uid = uuid.uuid4()
        if uid not in uidlist:
            uidlist.append(uid)
            data = variable_to_add+str(uid)
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")
            img.save(f'{data}.png')


def readqrcodes(path_to_image):
    from pyzbar.pyzbar import decode
    from PIL import Image
    decoded_image = decode(Image.open(path_to_image))
    return decoded_image


def seperate_shelf_box(decoded_pyzbar):
    shelfqrcodes = []
    vobjectqrcodes = []
    for qrcode in decoded_pyzbar:
        if "shelf" in str(qrcode.data):
            shelfqrcodes.append(qrcode)
        elif "vobject" in str(qrcode.data):
            vobjectqrcodes.append(qrcode)
    return {"shelf": shelfqrcodes, "vobject": vobjectqrcodes}


def average_coordinartes(pyzbar_vobject):
    xcoordinates = []
    ycoordinates = []
    for coordinates in pyzbar_vobject.polygon:
        if coordinates.x and coordinates.y:
            xcoordinates.append(coordinates.x)
            ycoordinates.append(coordinates.y)
    average_x_coordinate = sum(xcoordinates)/len(xcoordinates)
    average_y_coordinate = sum(ycoordinates)/len(ycoordinates)
    return {"x": average_x_coordinate, "y": average_y_coordinate}


def calculate_distances(shelf, vobject):
    import collections
    finaloutput = []
    for vobjectqrcode in vobject:
        distance_from_shelves = []
        for shelfqrcode in shelf:
            average_shelf_coordinate = average_coordinartes(shelfqrcode)
            average_vobject_coordinate = average_coordinartes(vobjectqrcode)
            if average_shelf_coordinate["y"] < average_vobject_coordinate["y"]:
                distance_from_shelves.append({"data": shelfqrcode.data, "distance": (
                    ((average_shelf_coordinate["y"]-average_vobject_coordinate["y"])**(2))+((average_shelf_coordinate["x"]-average_vobject_coordinate["x"])**(2)))**(1/2)})

        sorted_qrcodes = sorted(distance_from_shelves,
                                key=lambda kv: kv["distance"])
        finaloutput.append(
            {"vobject": vobjectqrcode.data, "shelf": sorted_qrcodes[0]["data"], "distance": sorted_qrcodes[0]["distance"]})
    return finaloutput


'''
abc = readqrcodes("test.jpg")
decoded = abc[1]
print(decoded.polygon)
print(average_coordinartes(decoded))
'''
test_read_qr_codes = readqrcodes("unknown.png")
dict_with_seperated_qr_data = seperate_shelf_box(test_read_qr_codes)
final_test_dict_with_distances = calculate_distances(
    dict_with_seperated_qr_data["shelf"], dict_with_seperated_qr_data["vobject"])
