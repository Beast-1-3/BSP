import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Warehouses (across India)
    const w1 = await prisma.warehouse.create({
        data: { name: 'Bengaluru Central', latitude: 12.9716, longitude: 77.5946 }
    });
    const w2 = await prisma.warehouse.create({
        data: { name: 'Mumbai Hub', latitude: 19.0760, longitude: 72.8777 }
    });
    const w3 = await prisma.warehouse.create({
        data: { name: 'Delhi North', latitude: 28.7041, longitude: 77.1025 }
    });

    // 2. Sellers
    const s1 = await prisma.seller.create({
        data: { name: 'Raju Traders', latitude: 12.9352, longitude: 77.6245 } // Near Bengaluru
    });
    const s2 = await prisma.seller.create({
        data: { name: 'Mumbai Wholesalers', latitude: 19.0210, longitude: 72.8600 } // Near Mumbai
    });

    // 3. Products
    const p1 = await prisma.product.create({
        data: { name: 'Aashirvaad Atta 10kg', weight: 10, dimensions: '40x30x10', price: 400, sellerId: s1.id }
    });
    const p2 = await prisma.product.create({
        data: { name: 'Tata Salt 1kg', weight: 1, dimensions: '15x10x5', price: 25, sellerId: s1.id }
    });
    const p3 = await prisma.product.create({
        data: { name: 'Maggi Noodles Box', weight: 5, dimensions: '30x30x20', price: 500, sellerId: s2.id }
    });

    // 4. Customers (Kirana Stores)
    await prisma.customer.create({
        data: { name: 'Sri Venkateshwara Stores', phone: '9876543210', latitude: 13.0279, longitude: 77.5409 } // Bengaluru
    });
    await prisma.customer.create({
        data: { name: 'Ramesh Provision Store', phone: '9876543211', latitude: 15.3647, longitude: 75.1240 } // Hubli, further away from Bangalore
    });
    await prisma.customer.create({
        data: { name: 'Pooja General Store', phone: '9876543212', latitude: 20.2961, longitude: 85.8245 } // Bhubaneswar, very far from Mumbai
    });

    console.log('Database seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
