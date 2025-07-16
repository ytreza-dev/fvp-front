import {describe, expect, it} from "vitest";

describe("US-1 - Afficher deux tâche en comparaison", () => {
    it("US-1-AC-1 : Sans priorité, on affiche les deux premières tâches", () => {
        // GIVEN
        const initialTasks = [
            "Envoyer un mail à la direction",
            "Nettoyer mon bureau",
            "Payer la facture d'électricité",
            "Corriger le bug qui fait perdre de l'argent au client"];

        // WHEN
        let tasksCompared = initialTasks.slice(0, 2);
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual(["Envoyer un mail à la direction", "Nettoyer mon bureau"]);
    });

    it("US-1-AC-2 : Sans priorité, on affiche les deux premières tâches", () => {
        // GIVEN
        const initialTasks = [
            "Envoyer un mail à la direction",
            "Nettoyer mon bureau",
            "Payer la facture d'électricité",
            "Corriger le bug qui fait perdre de l'argent au client"];

        // WHEN
        let tasksCompared = initialTasks.slice(0, 2);
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual(["Envoyer un mail à la direction", "Nettoyer mon bureau"]);
    });
})