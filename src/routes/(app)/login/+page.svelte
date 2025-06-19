<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { watch } from "runed";

    let email = $state("");
    let password = $state("");
    watch(
        () => [email, password],
        () => {
            fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
        },
    );
</script>

<Input bind:value={email}></Input>
<Input bind:value={password}></Input>
