# Introduction
This repository contains a collection of useful scripts.

## Ubuntu Scripts
### performance-laptop.sh
This is a bash script to modify the Ubuntu governor and adjust the CPU performance level.

CPU governors in Ubuntu are kernel settings that allow you to control how the CPU adjusts its speed according to the workload. Here are brief descriptions of the most common ones:

1. **ondemand**: Adjusts the CPU speed dynamically based on the system load. It strikes a good balance between performance and power consumption.
2. **performance**: Keeps the CPU at its maximum speed constantly. Ideal for tasks requiring maximum performance, but it consumes more power.
3. **powersave**: Keeps the CPU at its minimum speed constantly. Ideal for saving power, but it may reduce performance.
4. **userspace**: Allows the user to manually set the CPU speed. This requires superuser permissions and is more advanced.
5. **conservative**: Similar to ondemand but adjusts the CPU speed more gradually. It's suitable for battery-powered environments.

You can switch between these governors using tools like `cpupower`. Would you like to know how to do that?

## NodeJS
### create-ts-project.js
This is a base project skeleton with TypeScript and ViteTest pre-configured. To use it, you need to pass the name of your project as the first parameter.
```bash
create-ts-project.js <name_project>
```
