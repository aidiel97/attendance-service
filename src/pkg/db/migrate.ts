import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import AppDataSource from "./mysql";
import dotenv from "dotenv";

dotenv.config();

async function runMigrations() {
    try {
        await AppDataSource.initialize();

        await runSeedScripts();

    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    } finally {
        await AppDataSource.destroy();
    }
}

async function runSeedScripts() {
    const seedDir = join(__dirname, "../../seeds");
    const files = readdirSync(seedDir).filter(file => file.endsWith(".sql"));

    console.log(`🌱 Running seed scripts... (${files.length} found)`);

    for (const file of files) {
        const filePath = join(seedDir, file);
        const query = readFileSync(filePath, "utf-8");
        try {
            console.log(`🚀 Executing: ${file}`);
            await AppDataSource.query(query);
            console.log(`✅ Successfully executed: ${file}`);
        } catch (error) {
            console.error(`❌ Failed executing ${file}:`, error);
        }
    }

    console.log("🌱 Seeding completed!");
}

runMigrations();
