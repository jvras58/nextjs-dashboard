"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import photo from "../../../../public/assets/photo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AfiliadoCardProps {
    name: string;
    image?: string;
    dbParam?: string;
}

const AfiliadoCard = ({ name, image, dbParam }: AfiliadoCardProps) => {
const router = useRouter();

const handleRedirect = () => {
    if (dbParam) {
        console.log(`Redirecionando para /dashboard/${dbParam}`);
        router.push(`/dashboard/${dbParam}`);
    } else {
        console.error("dbParam está indefinido");
    }
    };

return (
<div className="container mx-auto mt-4">
    <Card className="max-w-sm mx-auto mt-4">
    <CardHeader>
        <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
        <Image
        src={image || photo.src}
        alt={name}
        className="w-full h-32 object-cover"
        width={500}
        height={200}
        priority={false}
        />
    </CardContent>
    <CardFooter className="flex justify-center">
        <Button onClick={handleRedirect}>Acessar</Button>
    </CardFooter>
    </Card>
</div>
);
};

export default AfiliadoCard;