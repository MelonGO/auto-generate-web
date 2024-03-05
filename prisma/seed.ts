import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
    {
        name: 'Java',
        link: 'java',
        sections: {
            create: [
                {
                    prompt: 'Introduce the Java Programming Language',
                    content: 'Edit or generate content for Java Programming Language'
                }
            ]
        },
        menus: {
            create: [
                {
                    name: 'First Java Program',
                    link: 'first-java-program',
                    sections: {
                        create: [
                            {
                                prompt: 'Write a tutorial on the topic of "First Java Program"',
                                content: 'Edit or generate content for First Java Program'
                            }
                        ]
                    }
                },
                {
                    name: 'Java Basic',
                    link: 'java-base',
                    sections: {
                        create: [
                            {
                                prompt: 'Java Basic',
                                content: 'Edit or generate content for Java Basic'
                            }
                        ]
                    },
                    submenus: {
                        create: [
                            {
                                name: 'Java String',
                                link: 'java-string',
                                sections: {
                                    create: [
                                        {
                                            prompt: 'Write a tutorial on the topic of "Java String"',
                                            content: 'Edit or generate content for Java String'
                                        }
                                    ]
                                }
                            },
                            {
                                name: 'Java Array',
                                link: 'java-array',
                                sections: {
                                    create: [
                                        {
                                            prompt: 'Write a tutorial on the topic of "Java Array"',
                                            content: 'Edit or generate content for Java Array'
                                        }
                                    ]
                                }
                            }
                        ]

                    }
                },
            ],
        },
    },

]

async function main() {
    console.log(`Start seeding ...`)

    let password = "welcome123";

    const user = await prisma.user.createMany({
        data: [
            {
                username: "admin",
                password: password,
            },
            {
                username: "guest",
                password: password,
            }
        ],
    })

    for (const c of categoryData) {
        const category = await prisma.category.create({
            data: c,
        })
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
