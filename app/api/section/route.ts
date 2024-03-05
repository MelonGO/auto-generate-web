import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { Section } from '@prisma/client';

import { auth } from '@/auth';

export async function GET(req: Request) {
    const session = await auth();

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const sections = await prisma.section.findMany();

    let sectionsGenerate: Section[] = [];
    for (const section of sections) {
        if (section.generate) {
            sectionsGenerate.push(section);
        }
    }

    return NextResponse.json(sectionsGenerate);
}

export async function PATCH(req: Request) {
    const session = await auth();

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    let json = await req.json();

    const updated_section = await prisma.section.update({
        where: {
            id: json.id,
        },
        data: {
            content: json.content,
            generate: false,
            updatedAt: new Date(),
        },
    });

    if (!updated_section) {
        return new NextResponse("No section with ID found", { status: 404 });
    }

    return NextResponse.json(updated_section);
}